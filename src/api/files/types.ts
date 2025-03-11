export type UploadFileQueryType = {
  Params: FormData;
  Data: {
    status: 'success';
    data: {
      path: 'string';
      publicUrl: 'string';
    };
  };
};
