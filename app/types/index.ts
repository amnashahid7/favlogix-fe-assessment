export type Phase =
  | "skeleton"
  | "loading"
  | "animating"
  | "loaded";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  message?: Message;
}

export interface Message {
  id: number;
  body: string;
  sender?: "user" | "system";
  time?: string;
}


export type Section = "inbox" | "chat" | "details";