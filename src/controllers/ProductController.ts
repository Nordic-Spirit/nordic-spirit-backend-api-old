import { Request, Response } from 'express';
import { bodyValidator, controller, use, get, post } from './decorators';
import { ProductRepo } from '../repos';
import { CustomError } from '../errors/CustomError';
import { CampaignRepo } from '../repos/CampaignRepo';
import { ProductProps, ProductDiscount, ProductCardProps } from '../interfaces';
import { ErrorNames, ErrorResponseCodes } from '../errors';
import { upload } from './utils/upload';

@controller('/products')
class ProductController {
  static productRepo = new ProductRepo();
  static campaignRepo = new CampaignRepo();

  // TODO - KESKEN
  @get('/')
  getProducts(req: Request, res: Response) {
    const userId: number | null = req.body.userId || null;

    ProductController.productRepo
      .find()
      .then(result => {
        res.status(200).send({
          data: {
            result
          }
        });
      })
      .catch(error => {
        const { name, message, sqlErrorCode } = error;

        res
          .status(ErrorResponseCodes._422)
          .send({ name, message, sqlErrorCode });
      });
  }

  @bodyValidator(
    'name',
    'description',
    'price',
    'alcohol',
    'capacity',
    'manufacturer',
    'countryOfManufacturer',
    'categorieId',
    'subCategorieId',
    'image'
  )
  @use(upload.single('image'))
  @post('/')
  addProduct(req: Request, res: Response) {
    const productDetails = req.body;
  }

  @get('/single/:id')
  getByProductId(req: Request, res: Response) {
    const productId = Number(req.params.id);
    const userId: number | null = req.body.userId || null;

    if (isNaN(productId)) {
      res
        .status(ErrorResponseCodes._422)
        .send(
          new CustomError(
            'Cant handle characters in product productId',
            ErrorNames.typeError
          )
        );

      return;
    }

    Promise.all<ProductProps[], ProductDiscount[]>([
      ProductController.productRepo.findById(productId, userId),
      ProductController.campaignRepo.findDiscountByProductId(productId)
    ])
      .then(result => {
        const [_product, discount] = result;

        const product = ProductController.addDiscountRow(_product, discount)[0];

        if (!product) {
          const error = new CustomError(
            'Cannot find product',
            ErrorNames.notFound
          );

          error.responseCode = ErrorResponseCodes._404;

          throw error;
        }

        res.status(200).send({
          data: {
            product
          }
        });
      })
      .catch(error => {
        const { name, message, responseCode } = error;

        res.status(error.responseCode).send({
          error: {
            name,
            message,
            responseCode
          }
        });
      });
  }

  @get('/latest')
  getLatest(req: Request, res: Response) {
    const userId: number | null = req.body.userId || null;

    Promise.all<ProductCardProps[], ProductDiscount[]>([
      ProductController.productRepo.findLatest(userId),
      ProductController.campaignRepo.findDiscounts()
    ])
      .then(result => {
        const [_products, discounts] = result;

        const products = ProductController.addDiscountRow(_products, discounts);

        res.status(200).send({
          data: {
            products
          }
        });
      })
      .catch(error => {
        const { name, message, sqlErrorCode } = error;

        res
          .status(ErrorResponseCodes._422)
          .send({ name, message, sqlErrorCode });
      });
  }

  @get('/mostpopulars')
  getMostPopulars(req: Request, res: Response) {
    const userId: number | null = req.body.userId || null;

    Promise.all<ProductCardProps[], ProductDiscount[]>([
      ProductController.productRepo.findMostPopulars(userId),
      ProductController.campaignRepo.findDiscounts()
    ])
      .then(result => {
        const [_products, discounts] = result;

        const products = ProductController.addDiscountRow(_products, discounts);

        res.status(200).send({
          data: {
            products
          }
        });
      })
      .catch(error => {
        const { name, message, sqlErrorCode } = error;

        res
          .status(ErrorResponseCodes._422)
          .send({ name, message, sqlErrorCode });
      });
  }

  @get('/bestratings')
  getBestRatings(req: Request, res: Response) {
    const userId: number | null = req.body.userId || null;

    Promise.all<ProductCardProps[], ProductDiscount[]>([
      ProductController.productRepo.findBestRatings(userId),
      ProductController.campaignRepo.findDiscounts()
    ])
      .then(result => {
        const [_products, discounts] = result;

        const products = ProductController.addDiscountRow(_products, discounts);

        res.status(200).send({
          data: {
            products
          }
        });
      })
      .catch(error => {
        res.status(422).send({ error });
      });
  }

  @bodyValidator('campaignId')
  @get('/bycampaignid')
  getByCampaignId(req: Request, res: Response) {
    const userId: number | null = req.body.userId || null;
    const campaignId: number = req.body.campaignId;

    Promise.all<ProductCardProps[], ProductDiscount[]>([
      ProductController.productRepo.findByCampaignId(campaignId, userId),
      ProductController.campaignRepo.findDiscounts()
    ])
      .then(result => {
        const [_products, discounts] = result;

        const products = ProductController.addDiscountRow(_products, discounts);

        res.status(200).send({
          data: {
            products
          }
        });
      })
      .catch(error => {
        res.status(422).send({ error });
      });
  }

  static addDiscountRow(
    products: ProductCardProps[],
    discounts: ProductDiscount[]
  ): ProductCardProps[] {
    return products.map((product: ProductCardProps): ProductCardProps => {
      discounts.forEach((discount: ProductDiscount) => {
        if (product.productId === discount.productId) {
          product['discountPercentage'] = discount.discountPercentage;

          return;
        }
      });

      return product;
    });
  }
}
