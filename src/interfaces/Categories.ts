export interface CategoryProps {
  categoryId: number;
  categoryName: string;
  categoryDescription?: string;
}

export interface SubCategoryProps {
  subCategoryId: number;
  subCategoryName: string;
  subCategoryCategoryId: number;
  description?: string;
}

export interface CombinedCategories extends CategoryProps {
  subCategories: SubCategoryProps[];
}
