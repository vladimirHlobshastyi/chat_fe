import { useParams } from '@tanstack/react-router';
import { useState, useEffect, useRef, RefObject } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMyProfileQuery } from '@/api/me/hooks';
import Avatar from '@/components/Avatar';
import { useChatByIdQuery } from '@/api/chats/hooks';
import { getInitials } from '@/utils/typography';
import { Span } from '@/components/Typography/Typography.component';
import MessageGroup from '@/components/MessageGroup';
import useUniversalKeyboardShortcuts from '@/hooks/useUniversalKeyboardShortcuts';
import { useChatStore } from '@/store/chatStore/useChatStore';
import { getUserStatus } from '@/utils/date';
import { useWebSocket } from '@/providers/WebSocketProvider/useWebSocket';
import Loader from '@/components/Loader';
import {
  useMarkMessagesAsReadMutation,
  useMessagesInfiniteQuery,
} from '@/api/message/hooks';
import ReactTimeAgo from 'react-time-ago';
import { useMessagesStore } from '@/store/messagesStore/useMessagesStore';

function DialogPage() {
  const [message, setMessage] = useState('');
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const initialScrollDone = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let typingTimeout: ReturnType<typeof setTimeout> | null = null;

  const ws = useWebSocket();
  const { userId: partnerId } = useParams({ from: '/admin/dialogs/$userId' });
  const queryClient = useQueryClient();
  const { data: myProfile } = useMyProfileQuery();
  const { mutate: mutateMarkedMessages } = useMarkMessagesAsReadMutation();
  const onlineUsers = useChatStore((s) => s.onlineUsers);
  const { messages, setMessages } = useMessagesStore();

  const isOnlineCurrentU = onlineUsers.has(partnerId);
  const myId = myProfile?.data.userId;
  const chatId = [myId, partnerId].sort().join('_');
  const currentUserId = myId;
  const { data: currentChat } = useChatByIdQuery(chatId);

  const { data, isFetched, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessagesInfiniteQuery(chatId, messages.length);

  const messagesData = (data?.pages ?? []).reduceRight(
    (acc, page) => [...acc, ...page],
    [],
  );
  const lastSeenPartner = currentChat?.last_seen;

  const handleTyping = () => {
    if (ws?.readyState !== WebSocket.OPEN) return;

    ws.send(
      JSON.stringify({
        type: 'typing',
        chatId,
        senderId: myId,
        isTyping: true,
      }),
    );

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      ws.send(
        JSON.stringify({
          type: 'typing',
          chatId,
          senderId: myId,
          isTyping: false,
        }),
      );
    }, 2000);
  };

  const handleSend = () => {
    if (
      !message.trim() ||
      !chatId ||
      !partnerId ||
      ws?.readyState !== WebSocket.OPEN
    )
      return;

    try {
      ws.send(
        JSON.stringify({
          type: 'message',
          chatId,
          recipientId: partnerId,
          text: message,
        }),
      );
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (chatId && isFetched && messagesData.length > 0) {
      mutateMarkedMessages(chatId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['unread-per-chat'] });
          queryClient.invalidateQueries({ queryKey: ['unread-total'] });
        },
      });
      queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
    }
  }, [chatId, isFetched]);

  useEffect(() => {
    if (!ws || !chatId) return;

    const handleMessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'new_message' && msg.data.chat_id === chatId) {
        setMessages(msg.data);
        scrollToBottom();
      }

      if (msg.type === 'typing' && msg.chatId === chatId) {
        setIsPartnerTyping(msg.isTyping);
      }
    };

    ws.addEventListener('message', handleMessage);
    return () => ws.removeEventListener('message', handleMessage);
  }, [ws, chatId, queryClient]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
      });
    }, 0);
  };

  useEffect(() => {
    if (!topRef.current || !hasNextPage || isFetchingNextPage) return;

    const container = scrollContainerRef.current;
    const prevScrollHeight = container?.scrollHeight || 0;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        if (!initialScrollDone.current) {
          initialScrollDone.current = true;
          return;
        }

        fetchNextPage().then(() => {
          requestAnimationFrame(() => {
            if (container) {
              const newScrollHeight = container.scrollHeight;
              container.scrollTop += newScrollHeight - prevScrollHeight;
            }
          });
        });
      }
    });

    observer.observe(topRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (isFetched) scrollToBottom();
  }, [isFetched, chatId]);

  useUniversalKeyboardShortcuts({
    shortcuts: [{ key: 'Enter', action: handleSend }],
    ref: mainRef as RefObject<HTMLElement>,
  });
  const getPartnerStatus = () => {
    if (isOnlineCurrentU) return 'Online';
    if (lastSeenPartner)
      return (
        <ReactTimeAgo date={lastSeenPartner} locale='en-US' timeStyle='round' />
      );
    return 'Offline';
  };

  return (
    <div
      className='w-full h-full flex flex-col border border-gray-200 rounded-xl ml-6 bg-white overflow-hidden'
      ref={mainRef}
    >
      <div className='px-5 py-4 flex gap-3 items-center border-b border-gray-200'>
        <Avatar
          userStatus={getUserStatus(isOnlineCurrentU, lastSeenPartner)}
          size='md'
          src={currentChat?.partner_avatar}
          initials={getInitials(currentChat?.partner_name || 'avatar')}
        />
        <div className='flex flex-col'>
          <Span className='text-sm'>{currentChat?.partner_name}</Span>
          <Span className='text-xs text-gray-400'>{getPartnerStatus()}</Span>
        </div>
      </div>
      <div
        className='flex-1 overflow-x-hidden overflow-y-auto bg-white p-5 rounded flex flex-col'
        ref={scrollContainerRef}
      >
        <div ref={topRef} className='h-1' />
        <div className='min-h-5'>
          {isPartnerTyping && (
            <span className='text-sm text-gray-400 animate-pulse block'>
              typing...
            </span>
          )}
        </div>

        {!isFetched ? (
          <Loader />
        ) : messagesData.length > 0 ? (
          <MessageGroup
            messages={messagesData}
            currentUserId={currentUserId as string}
            partnerAvatar={currentChat?.partner_avatar}
            partnerName={currentChat?.partner_name}
          />
        ) : (
          <div className='text-sm text-gray-400'>No messages yet...</div>
        )}
        {messages && (
          <MessageGroup
            messages={messages}
            currentUserId={currentUserId as string}
            partnerAvatar={currentChat?.partner_avatar}
            partnerName={currentChat?.partner_name}
          />
        )}
      </div>
      <div className='w-full flex gap-2 p-3 border-t border-gray-200'>
        <input
          className='border-none w-full focus:outline-none'
          value={message}
          onInput={handleTyping}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message...'
        />
        <button
          onClick={handleSend}
          className='bg-blue-600 text-white h-9 w-9 flex items-center justify-center rounded-md'
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.98481 2.44399C3.11333 1.57147 1.15325 3.46979 1.96543 5.36824L3.82086 9.70527C3.90146 9.89367 3.90146 10.1069 3.82086 10.2953L1.96543 14.6323C1.15326 16.5307 3.11332 18.4291 4.98481 17.5565L16.8184 12.0395C18.5508 11.2319 18.5508 8.76865 16.8184 7.961L4.98481 2.44399ZM3.34453 4.77824C3.0738 4.14543 3.72716 3.51266 4.35099 3.80349L16.1846 9.32051C16.762 9.58973 16.762 10.4108 16.1846 10.68L4.35098 16.197C3.72716 16.4879 3.0738 15.8551 3.34453 15.2223L5.19996 10.8853C5.21944 10.8397 5.23735 10.7937 5.2537 10.7473L9.11784 10.7473C9.53206 10.7473 9.86784 10.4115 9.86784 9.99726C9.86784 9.58304 9.53206 9.24726 9.11784 9.24726L5.25157 9.24726C5.2358 9.20287 5.2186 9.15885 5.19996 9.11528L3.34453 4.77824Z'
              fill='white'
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default DialogPage;
