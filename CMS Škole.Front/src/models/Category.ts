export interface Category {
  id: string;
  name: string;
  parentCategory?: Category;
  subCategories?: Category[];
}
