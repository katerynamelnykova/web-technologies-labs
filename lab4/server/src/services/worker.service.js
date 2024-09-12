import { Worker } from '../models/index.js';

export default class WorkerService {
  async getWorkerById(id) {
    return await Worker.findOne({ _id: id });
  }

  async createWorker(workerData) {
    return await Worker.create(workerData);
  }

  async updateWorker(id, newData) {
    return await Worker.findOneAndUpdate({ _id: id }, newData);
  }

  async deleteWorker(id) {
    return await Worker.findOneAndDelete({ _id: id });
  }

  async getAllWorkers() {
    return await Worker.find();
  }
}
