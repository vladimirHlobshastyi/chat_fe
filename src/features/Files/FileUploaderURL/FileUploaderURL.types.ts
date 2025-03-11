import { FileUploaderProps } from '@/components/FileUploader/FileUploader.types';

export interface FileUploaderURLProps extends FileUploaderProps {
  errorMessage?: string;
  onUploadSuccess: (fileUrl: string) => void;
}
