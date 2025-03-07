import { TableImageProps } from './TableImage.types';

const TableImage = ({ src, alt }: TableImageProps) => {
  return (
    <span className='block w-10 h-10 relative overflow-hidden rounded-full'>
      <img
        src={src}
        alt={alt}
        className='absolute object-cover w-full h-full'
      />
    </span>
  );
};

export default TableImage;
