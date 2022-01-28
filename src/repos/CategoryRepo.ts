import { ModelRepo } from './ModelRepo';
import { CategoryProps, SubCategoryProps } from '../interfaces';

export class CategoryRepo extends ModelRepo {
  async findCategories(): Promise<CategoryProps[]> {
    const result = await this.query<CategoryProps>(`
      SELECT
        id AS category_id,
        name As category_name
      FROM categories;
    `);

    return result;
  }

  x = new Promise((resolve, reject) => {});

  async findSubCategories(): Promise<SubCategoryProps[]> {
    const result = await this.query<SubCategoryProps>(`
      SELECT
        id AS sub_category_id,
        name AS sub_category_name,
        category_id AS sub_category_category_id
      FROM sub_categories;
    `);

    return result;
  }
}
