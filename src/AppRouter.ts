import express from 'express';

export class AppRouter {
  private static instance: express.Router;

  static getInstance() {
    if (!AppRouter.instance) {
      this.instance = express.Router();
    }

    return this.instance;
  }
}
