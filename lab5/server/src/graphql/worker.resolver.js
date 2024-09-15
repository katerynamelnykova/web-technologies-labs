import { buildSchema } from 'graphql';
import { WorkerModel } from '../models/worker.model.js';

const schema = buildSchema(`
  type Worker {
    id: ID!
    name: String!
    room: String!
    department: String!
    computer: String!
    date: String
  }

  type Query {
    getWorkerById(id: ID!): Worker
    getAllWorkers: [Worker]
  }

  type Mutation {
    createWorker(name: String!, room: String!, department: String!, computer: String!): Worker
    updateWorker(id: ID!, name: String, room: String, department: String, computer: String): Worker
    deleteWorker(id: ID!): Worker
  }
`);


const resolver = {
  getWorkerById: async ({ id }) => {
    try {
      const worker = await WorkerModel.findOne({ _id: id });
      return worker;
    } catch (error) {
      throw new Error('Error fetching worker by ID');
    }
  },
  getAllWorkers: async () => {
    try {
      const workers = await WorkerModel.find();
      return workers;
    } catch (error) {
      throw new Error('Error fetching all workers');
    }
  },
  createWorker: async ({ name, room, department, computer }) => {
    try {
      const newWorker = new WorkerModel({ name, room, department, computer });
      return await newWorker.save();
    } catch (error) {
      throw new Error('Error creating worker');
    }
  },
  updateWorker: async ({ id, name, room, department, computer }) => {
    try {
      return await WorkerModel.findOneAndUpdate(
        { _id: id },
        { name, room, department, computer },
        { new: true }
      );
    } catch (error) {
      throw new Error('Error updating worker');
    }
  },
  deleteWorker: async ({ id }) => {
    try {
      return await WorkerModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new Error('Error deleting worker');
    }
  }
};

export { schema, resolver };
