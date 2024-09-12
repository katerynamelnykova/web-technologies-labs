import workerRouter from './worker.route.js';
import { APP_ROUTES } from '../consts/routes.const.js';

export class AppRouter {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.app.get('/', (_req, res) => {
      res.send('This is the workers database API!');
    });
    this.app.use(APP_ROUTES.WORKER, workerRouter);
  }
}