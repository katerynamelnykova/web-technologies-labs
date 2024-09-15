import WorkerService from '../services/worker.service.js';

export class WorkerController {
  constructor(workerService) {
    this.workerService = workerService;
  }

  async getAllWorkers(_, res) {
    try {
      const result = await this.workerService.getAllWorkers();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getWorkerById(req, res) {
    const id = req.params.id;

    try {
      const result = await this.workerService.getWorkerById(id);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async createWorker(req, res) {
    const workerData = req.body;

    try {
      const result = await this.workerService.createWorker(workerData);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateWorker(req, res) {
    const id = req.params.id;
    const newData = req.body;

    try {
      const result = await this.workerService.updateWorker(id, newData);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteWorker(req, res) {
    const id = req.params.id;

    try {
      const result = await this.workerService.deleteWorker(id);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

const workerController = new WorkerController(new WorkerService());
export default workerController;