import { cn } from '@/utils/styles';

const MessageCounter = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'min-w-5 h-5 bg-gray-400 text-text-primary text-xs rounded-full flex items-center justify-center px-1 leading-none',
        className,
      )}
    >
      {value > 99 ? '99+' : value}
    </span>
  );
};

export default MessageCounter;
