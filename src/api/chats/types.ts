export interface Chat {
  chat_created_at: string;
  chat_id: string;
  last_message: string;
  partner_avatar?: string;
  partner_id: string;
  partner_name: string;
  last_message_time?: Date;
  last_seen?: Date;
}

export interface AddChatQueryType {
  Params: {
    senderId: string;
    recipientId: string;
  };
  Data: unknown;
}

export interface GetChatQueryType {
  Params: {
    search?: string;
  };
  Data: Chat[];
}

export interface GetSingleChatQueryType {
  Params: string;
  Data: Chat;
}
