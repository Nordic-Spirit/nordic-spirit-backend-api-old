"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CampaignController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const repos_1 = require("../repos");
let CampaignController = CampaignController_1 = class CampaignController {
    getCampaigns(req, res) {
        CampaignController_1.campaignRepo
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
    getLatest(req, res) {
        Promise.all([
            CampaignController_1.campaignRepo.findLatest(),
            CampaignController_1.campaignRepo.findLatestProductIds()
        ])
            .then(result => {
            const [campaigns, Ids] = result;
            res.status(200).send({
                data: {
                    campaigns: campaigns.map((campaign) => {
                        return Object.assign(Object.assign({}, campaign), { productIds: Ids.flatMap((id) => {
                                if (campaign.campaignId !== id.campaignId)
                                    return [];
                                return id.productId;
                            }) });
                    })
                }
            });
        })
            .catch(error => {
            res.status(422).send({ error });
        });
    }
};
CampaignController.campaignRepo = new repos_1.CampaignRepo();
CampaignController.productRepo = new repos_1.ProductRepo();
__decorate([
    decorators_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "getCampaigns", null);
__decorate([
    decorators_1.get('/latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "getLatest", null);
CampaignController = CampaignController_1 = __decorate([
    decorators_1.controller('/campaigns')
], CampaignController);
