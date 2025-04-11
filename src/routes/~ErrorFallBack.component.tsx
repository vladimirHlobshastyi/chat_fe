import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { H1, Text } from '@/components/Typography/Typography.component';

export const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className='w-full h-screen p-8 flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='flex flex-col items-center'>
          <Icon
            width={40}
            height={40}
            name='FaceExplodeIcon'
            className='text-text-icon'
          />

          <H1 className='text-lg font-bold text-text-error'>
            Somethings gone wrong...
          </H1>
        </div>
        <Text className='text-gray-700 mt-4'>{error.message}</Text>
        <Button color='secondary' onClick={() => window.location.reload()}>
          Reload
        </Button>
      </div>
    </div>
  );
};
