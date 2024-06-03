export type MessaeType = {
  message: string | null;
  email: string | null;
  sender: string | null;
  reciver: string | null;
  time: string | null;
};

export type chatUser = {
  email: string;
  senderSocketID: string | null;
  adminSocketID: string | null
  }
export type User = {
  _id: number | null;
  password: string | null;
  name: string | null;
  level: string | null;
  email: string;
  token: string | null;
  reciverSocketID: string | null;
  senderSocketID: string | null;
  messageSender: string | null;
  messageReceiver: string | null;
  adminSocketID: string | null;
};
