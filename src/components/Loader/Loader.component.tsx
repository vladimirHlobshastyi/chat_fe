import { cn } from '@/utils/styles';
import { LoaderProps } from './Loader.types';

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={
        'absolute inset-0 bg-white/70 dark:bg-black/70 z-30 flex items-center justify-center'
      }
    >
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-solid border-primary border-t-transparent h-12 w-12',
          className,
        )}
      />
    </div>
  );
};

export default Loader;
