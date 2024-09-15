import { model, Schema } from 'mongoose';

const workerSchema = new Schema({
  name: { type: String, required: true },
  room: { type: String, required: true },
  department: { type: String, required: true },
  computer: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const WorkerModel = model('Worker', workerSchema);

export { WorkerModel as WorkerModel };