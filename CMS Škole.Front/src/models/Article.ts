import { User } from "./User";

export interface Article {
  id: string;
  name: string;
  creationDate: Date;
  content?: string;
  description: string;
  author: User;
  image: string;
}
