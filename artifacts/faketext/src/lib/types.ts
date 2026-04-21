export type Sender = "me" | "them";
export type MsgStatus = "sent" | "delivered" | "read";

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  time: string;
  status?: MsgStatus;
  image?: string;
  isVoice?: boolean;
  voiceLen?: string;
}

export interface ChatConfig {
  contactName: string;
  contactAvatar?: string;
  online: boolean;
  lastSeen?: string;
  time: string;
  battery: number;
  carrier: string;
  dark: boolean;
}

export interface CommentItem {
  id: string;
  author: string;
  handle?: string;
  avatar?: string;
  verified?: boolean;
  text: string;
  time: string;
  likes: number;
  pinned?: boolean;
  hearted?: boolean;
  replies?: CommentItem[];
}

export interface PostConfig {
  author: string;
  handle: string;
  avatar?: string;
  verified: boolean;
  text: string;
  image?: string;
  likes: number;
  shares?: number;
  views?: number;
  time: string;
  dark: boolean;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
