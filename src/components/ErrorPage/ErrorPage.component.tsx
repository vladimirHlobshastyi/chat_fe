import { H3 } from '../Typography/Typography.component';

const ErrorPage = ({ label }: { label: string }) => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-100'>
      <H3 className='text-text-error'>{label}</H3>
    </div>
  );
};

export default ErrorPage;
