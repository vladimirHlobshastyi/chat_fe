import { cn } from '@/utils/styles';
import { Span } from '../Typography/Typography.component';
import { useState } from 'react';
import { AvatarProps } from './Avatar.type';

const Avatar = ({
  src,
  alt = 'User',
  size = 'default',
  initials,
  className,
  userStatus = 'offline',
  ...rest
}: AvatarProps) => {
  const [isError, setIsError] = useState(false);

  const sizeClasses = {
    default: 'h-10 w-10',
    md: 'h-11 w-11',
    xl: 'h-20 w-20',
  };

  const textSizeClasses = {
    default: 'text-1xl',
    md: 'text-2xl',
    xl: 'text-4xl',
  };

  const dotSize = {
    default: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    xl: 'h-4 w-4',
  };

  const dotColor = {
    online: 'bg-green-500',
    recently: 'bg-orange',
    offline: '',
  };

  const shouldShowDot = userStatus !== 'offline';

  return (
    <span
      {...rest}
      className={cn(
        'relative rounded-full bg-gray-50 flex items-center justify-center',
        sizeClasses[size],
        className,
      )}
    >
      {!isError && src ? (
        <img
          loading='lazy'
          src={src}
          alt={alt}
          className='h-full w-full rounded-full object-cover'
          onError={() => setIsError(true)}
        />
      ) : (
        <Span className={cn('text-text-secondary', textSizeClasses[size])}>
          {initials}
        </Span>
      )}
      {shouldShowDot && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-[1.5px] border-white',
            dotSize[size],
            dotColor[userStatus],
          )}
        />
      )}
    </span>
  );
};

export default Avatar;
