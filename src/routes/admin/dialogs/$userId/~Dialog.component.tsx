import { useParams } from '@tanstack/react-router';
import { useState, useEffect, useRef, RefObject } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMessages } from '@/api/message/requests';
import { useMyProfileQuery } from '@/api/me/hooks';
import { Message } from '@/types/messages';
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

function DialogPage() {
  const [message, setMessage] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const ws = useWebSocket();

  const { userId: partnerId } = useParams({ from: '/admin/dialogs/$userId' });
  const queryClient = useQueryClient();
  const { data: myProfile } = useMyProfileQuery();
  const onlineUsers = useChatStore((s) => s.onlineUsers);
  const isOnlineCurrentU = onlineUsers.has(partnerId);

  const chatId = [myProfile?.data.userId, partnerId].sort().join('_');
  const currentUserId = myProfile?.data.userId;
  const { data: currentChat } = useChatByIdQuery(chatId);

  const { data: messagesData = [], isFetched } = useQuery<Message[]>({
    queryKey: ['dialog', chatId],
    queryFn: () => getMessages(chatId),
    enabled: !!chatId,
  });

  useEffect(() => {
    if (!ws || !chatId) return;

    const handleMessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'new_message' && msg.data.chat_id === chatId) {
        queryClient.setQueryData(['dialog', chatId], (old: Message[] = []) => [
          ...old,
          msg.data,
        ]);
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws, chatId, queryClient]);

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
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    queryClient.invalidateQueries({ queryKey: ['chats'] });
  }, [messagesData]);

  useUniversalKeyboardShortcuts({
    shortcuts: [{ key: 'Enter', action: handleSend }],
    ref: mainRef as RefObject<HTMLElement>,
  });
  return (
    <div
      className='w-full h-full flex flex-col border border-gray-200 rounded-xl ml-6 bg-white'
      ref={mainRef}
    >
      <div className='px-5 py-4 flex gap-3 items-center border-b border-gray-200'>
        <Avatar
          userStatus={getUserStatus(isOnlineCurrentU, currentChat?.last_seen)}
          size='md'
          src={currentChat?.partner_avatar}
          initials={getInitials(currentChat?.partner_name || 'avatar')}
        />
        <Span className='text-sm'>{currentChat?.partner_name}</Span>
      </div>
      <div className='flex-1 overflow-y-auto bg-white p-5 rounded'>
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

        <div ref={bottomRef} />
      </div>
      <div className='w-full flex gap-2 p-3 border-t border-gray-200'>
        <input
          className='border-none w-full focus:outline-none'
          value={message}
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
