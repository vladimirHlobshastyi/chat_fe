import { AvatarProps } from './Avatar.type';
import { cn } from '@/utils/styles';
import { Span } from '../Typography/Typography.component';
import { useState } from 'react';

const Avatar = ({
  src,
  alt = 'User',
  initials,
  className,
  ...rest
}: AvatarProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <span
      {...rest}
      className={cn(
        'relative h-10 w-10 rounded-full bg-gray-150 flex items-center justify-center',
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
        <Span className='text-2xl text-text-secondary'>{initials}</Span>
      )}
    </span>
  );
};

export default Avatar;
