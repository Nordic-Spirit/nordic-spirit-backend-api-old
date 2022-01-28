export interface CampaignProps {
  campaignId: number;
  campaignName: string;
  endsAt: Date;
  discountPercentage: number;
  productCountInCampaign: number;
  productIds?: number[];
}

export interface ProductDiscount {
  productId: number;
  discountPercentage: number;
}

export interface ProductCampaignIds {
  productId: number;
  campaignId: number;
}
