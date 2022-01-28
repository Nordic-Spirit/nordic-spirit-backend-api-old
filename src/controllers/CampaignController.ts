import { Request, Response } from 'express';
import { controller, get } from './decorators';
import { CampaignRepo, ProductRepo } from '../repos';
import {
  CampaignProps,
  ProductCampaignIds,
  ProductCardProps
} from '../interfaces';

@controller('/campaigns')
class CampaignController {
  static campaignRepo = new CampaignRepo();
  static productRepo = new ProductRepo();

  @get('/')
  getCampaigns(req: Request, res: Response) {
    CampaignController.campaignRepo
      .find()
      .then(result => {
        res.status(200).send({
          data: {
            result
          }
        });
      })
      .catch(error => {
        res.status(422).send({ error });
      });
  }

  // Palauttaa etusivulle max 2 uusinta käynnissä olevaa kampanjaa, joiden mukava palatetaan
  // product id:t, jotka liittyvät kuhunkin kampanjaan. Näillä id:illä saadaan avattua suoraan klikatun
  // kampanjan tuotteet kampanjat sivulla, kun taas loppujen käynnissä olevien kampanjoiden tuotteet
  // haetaan vasta kun käyttäjä klikkaa kampanjasivulla kampanjan auki
  @get('/latest')
  getLatest(req: Request, res: Response) {
    Promise.all<CampaignProps[], ProductCampaignIds[]>([
      CampaignController.campaignRepo.findLatest(),
      CampaignController.campaignRepo.findLatestProductIds()
    ])
      .then(result => {
        const [campaigns, Ids] = result;

        res.status(200).send({
          data: {
            campaigns: campaigns.map(
              (campaign: CampaignProps): CampaignProps => {
                return {
                  ...campaign,
                  productIds: Ids.flatMap(
                    (id: ProductCampaignIds): number | [] => {
                      if (campaign.campaignId !== id.campaignId) return [];

                      return id.productId;
                    }
                  )
                };
              }
            )
          }
        });
      })
      .catch(error => {
        res.status(422).send({ error });
      });
  }
}
