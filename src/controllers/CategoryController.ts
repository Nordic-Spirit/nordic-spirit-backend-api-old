import { Request, Response } from 'express';
import { controller, get } from './decorators';
import { CategoryRepo } from '../repos';
import {
  CategoryProps,
  CombinedCategories,
  SubCategoryProps
} from '../interfaces';

@controller('/categories')
class CategoryController {
  static categoryRepo = new CategoryRepo();

  // TODO - KESKEN
  @get('/')
  getCategories(req: Request, res: Response) {
    Promise.all<CategoryProps[], SubCategoryProps[]>([
      CategoryController.categoryRepo.findCategories(),
      CategoryController.categoryRepo.findSubCategories()
    ])
      .then(result => {
        const [categories, subCategories] = result;

        const combinedCategories = CategoryController.combineCategories(
          categories,
          subCategories
        );

        res.status(200).send({
          data: {
            combinedCategories
          }
        });
      })
      .catch(error => {
        // TODO - ERROR HANDLINGIIN PAREMMAN VASTAUKSEN LÄHETTÄMINEN CLIENTILLE

        if (error.sqlErrorCode) {
          res.status(422).send(error);

          return;
        }

        res.status(422).send(error);
      });
  }

  static combineCategories(
    categories: CategoryProps[],
    subCategories: SubCategoryProps[]
  ): CombinedCategories[] {
    return categories.map(
      ({ categoryId, categoryName }: CategoryProps): CombinedCategories => {
        return {
          categoryId,
          categoryName,
          subCategories: subCategories.flatMap(
            ({
              subCategoryId,
              subCategoryName,
              subCategoryCategoryId
            }: SubCategoryProps): SubCategoryProps | [] => {
              if (categoryId !== subCategoryCategoryId) return [];

              return {
                subCategoryId,
                subCategoryName,
                subCategoryCategoryId
              };
            }
          )
        };
      }
    );
  }
}
