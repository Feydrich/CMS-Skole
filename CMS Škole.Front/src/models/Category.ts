export interface Category {
  id: number;
  name: string;
  superCategory?: Category;
  subCategories?: Category[];
}
