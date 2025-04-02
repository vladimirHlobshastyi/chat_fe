import { shouldShowTimestamp } from '@/utils/date';
import Avatar from '@/components/Avatar';
import { Text } from '@/components/Typography/Typography.component';
import { getInitials } from '@/utils/typography';
import { cn } from '@/utils/styles';
import { MessageGroupProps } from './MessageGroup.types';
import ReactTimeAgo from 'react-time-ago';

export const MessageGroup = ({
  messages,
  partnerAvatar,
  partnerName,
  currentUserId,
}: MessageGroupProps) => {
  if (!messages.length) return null;

  return (
    <div className='flex flex-col gap-2'>
      {messages.map((msg, i) => {
        const isPartnerMessage = msg.sender_id !== currentUserId;
        const next = messages[i + 1];
        const showAvatar =
          isPartnerMessage &&
          (i === 0 || messages[i - 1]?.sender_id !== msg.sender_id);

        const showTimestamp = shouldShowTimestamp(
          msg.created_at,
          next?.created_at,
          msg.sender_id,
          next?.sender_id,
        );

        return (
          <div key={msg.id} className='flex flex-col'>
            <div
              className={cn(
                'flex',
                isPartnerMessage ? 'justify-start gap-2' : 'justify-end',
              )}
            >
              {isPartnerMessage && (
                <div className='w-10 flex-shrink-0'>
                  {showAvatar ? (
                    <Avatar
                      size='md'
                      src={partnerAvatar}
                      initials={getInitials(partnerName || 'avatar')}
                    />
                  ) : (
                    <div className='w-10 h-10' />
                  )}
                </div>
              )}
              <div
                className={cn(
                  'inline-block max-w-[70%] px-3 py-2 rounded-md',
                  isPartnerMessage
                    ? 'ml-2 bg-gray-150 text-gray-800'
                    : 'bg-primary text-white',
                )}
              >
                <Text className='text-sm break-words'>{msg.text}</Text>
              </div>
            </div>

            {showTimestamp && (
              <ReactTimeAgo
                className={cn(
                  'flex text-gray-400 text-xs mt-1',
                  isPartnerMessage ? 'justify-start ml-12' : 'justify-end',
                )}
                date={msg.created_at}
                locale='en'
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageGroup;
