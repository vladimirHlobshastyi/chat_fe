export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  recipient_id: string;
  text: string | null;
  gift_id: number | null;
  image_url?: string;
  is_read?: boolean;
  created_at: Date;
};
