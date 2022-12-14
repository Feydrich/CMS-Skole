import { Category } from "./Category";
import { User } from "./User";

export interface Article {
  id: string;
  created: Date;
  title: string;
  html?: string;
  description: string;
  author: User;
  image: string;
  category?: Category;
}
