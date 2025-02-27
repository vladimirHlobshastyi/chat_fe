import { AvatarProps } from './Avatar.type';
import { cn } from '@/utils/styles';
import { Span } from '../Typography/Typography.component';

const Avatar = ({
  src,
  alt = 'User',
  initials,
  className,
  ...rest
}: AvatarProps) => {
  return (
    <div
      {...rest}
      className={cn(
        'relative h-14 w-full max-w-14 rounded-full bg-gray-200',
        initials && 'inline-flex items-center justify-center',
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className='overflow-hidden rounded-full' />
      ) : (
        <Span className='text-2xl'>{initials}</Span>
      )}
    </div>
  );
};

export default Avatar;
