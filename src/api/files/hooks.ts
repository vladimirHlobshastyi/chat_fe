  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import { uploadFile } from './requests';

  export const useUploadFileMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: uploadFile,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['files'] });
      },
      onError: (error) => {
        console.error('Upload file failed:', error);
      },
    });
  };
