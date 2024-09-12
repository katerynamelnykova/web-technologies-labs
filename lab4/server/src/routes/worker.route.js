import { Router } from 'express';

import workerController from '../controllers/worker.controller.js';

const workerRouter = Router();

workerRouter.get('/:id', workerController.getWorkerById.bind(workerController));
workerRouter.get('/', workerController.getAllWorkers.bind(workerController));
workerRouter.post('/create', workerController.createWorker.bind(workerController));
workerRouter.post('/update/:id', workerController.updateWorker.bind(workerController));
workerRouter.delete('/delete/:id', workerController.deleteWorker.bind(workerController));

export default workerRouter;
