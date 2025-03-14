interface FileResponseData {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface UploadFileQueryType {
  Params: FormData;
  Data: {
    status: string;
    data: FileResponseData;
  };
}
