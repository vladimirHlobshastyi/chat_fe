import { AvatarProps } from './Avatar.type';
import { cn } from '@/utils/styles';
import { Span } from '../Typography/Typography.component';
import { useState } from 'react';

const Avatar = ({
  src,
  alt = 'User',
  size = 'default',
  initials,
  className,
  ...rest
}: AvatarProps) => {
  const [isError, setIsError] = useState(false);
  const isDefaultSize = size === 'default';

  return (
    <span
      {...rest}
      className={cn(
        'relative rounded-full bg-gray-150 flex items-center justify-center',
        isDefaultSize ? 'h-10 w-10' : 'h-20 w-20',
        className,
      )}
    >
      {!isError && src ? (
        <img
          src={src}
          alt={alt}
          className='h-full w-full rounded-full object-cover'
          onError={() => setIsError(true)}
        />
      ) : (
        <Span
          className={cn(
            'text-text-secondary',
            isDefaultSize ? 'text-2xl' : 'text-4xl',
          )}
        >
          {initials}
        </Span>
      )}
    </span>
  );
};

export default Avatar;
