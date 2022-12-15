export interface Category {
  id: number;
  name: string;
  parentCategory?: Category;
  subCategories?: Category[];
}
