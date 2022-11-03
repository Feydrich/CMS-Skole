import { User } from "./User";

export interface Article {
  name: string;
  creationDate: Date;
  content?: string;
  description: string;
  author: User;
  image: string;
}
