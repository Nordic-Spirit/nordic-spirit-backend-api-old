import { controller, get, post, bodyValidator } from './decorators';
import { Request, Response } from 'express';
import { BasketRepo, ProductRepo } from '../repos';
import { ErrorNames } from '../errors';
import { BasketProductProps } from '../interfaces';

@controller('/basket')
class BasketController {
  static basketRepo = new BasketRepo();
  static productRepo = new ProductRepo();

  @get('/count')
  getCount(req: Request, res: Response) {
    const sessionId: string = req.session.id;

    BasketController.basketRepo
      .findCount(sessionId)
      .then(result => {
        res.status(200).send({
          data: {
            count: result
          }
        });
      })
      .catch(error => {
        res.status(422).send({
          error
        });
      });
  }

  @get('/')
  getBasket(req: Request, res: Response) {
    const sessionId: string = req.session.id;

    BasketController.basketRepo
      .findBySessionId(sessionId)
      .then(result => {
        res.status(200).send({
          data: {
            products: result
          }
        });
      })
      .catch(error => {
        res.status(422).send({ error });
      });
  }

  @bodyValidator('productId')
  @post('/')
  addProduct(req: Request, res: Response) {
    const productId: number = req.body.productId;
    const sessionId: string = req.session.id;

    Promise.all<number[], BasketProductProps>([
      BasketController.basketRepo.insert(sessionId, productId),
      BasketController.basketRepo.findProductById(productId)
    ])
      .then(result => {
        const [id, product] = result;

        res.status(200).send({
          data: {
            product
          }
        });
      })
      .catch(error => {
        if (error.sqlErrorCode === '23502') {
          res.status(422).send({
            error: {
              name: ErrorNames.notFound,
              message: "Can't find product with that id"
            }
          });

          return;
        }

        res.status(422).send({ error });
      });
  }
}
