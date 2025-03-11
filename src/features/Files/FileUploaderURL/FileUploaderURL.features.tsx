import { useUploadFileMutation } from '@/api/files/hooks';
import FileUploader from '@/components/FileUploader';
import { useRef, useState } from 'react';
import { FileUploaderURLProps } from './FileUploaderURL.types';

const FileUploaderURL = ({
  errorMessage,
  onUploadSuccess,
  ...rest
}: FileUploaderURLProps) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: uploadFile, isPending } = useUploadFileMutation();
  const errMessage = error || errorMessage;

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    uploadFile(formData, {
      onSuccess: (response) => {
        onUploadSuccess(response.data.publicUrl);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      onError: (error) => {
        setError(error.message);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
    });
  };

  return (
    <div className='flex flex-col gap-2'>
      <FileUploader {...rest} ref={fileInputRef} onChange={handleFileUpload} />

      {isPending && (
        <span className='helper-text text-primary'>Uploading...</span>
      )}

      {!!errMessage && !isPending && (
        <span className='helper-text text-text-error'>{errMessage}</span>
      )}
    </div>
  );
};

export default FileUploaderURL;
