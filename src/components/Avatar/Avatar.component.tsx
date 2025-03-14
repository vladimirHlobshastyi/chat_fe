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
  ...rest
}: AvatarProps) => {
  const [isError, setIsError] = useState(false);

  const sizeClasses = {
    default: 'h-10 w-10',
    md: 'h-11 w-11',
    xl: 'h-20 w-20',
  };

  const textSizeClasses = {
    default: 'text-2xl',
    md: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <span
      {...rest}
      className={cn(
        'relative rounded-full bg-gray-150 flex items-center justify-center',
        sizeClasses[size],
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
        <Span className={cn('text-text-secondary', textSizeClasses[size])}>
          {initials}
        </Span>
      )}
    </span>
  );
};

export default Avatar;
