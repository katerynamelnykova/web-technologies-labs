import axios from 'axios';
import { Worker, NewWorker } from '../types/index'

async function getAllWorkers() {
  const result = await axios.get('http://localhost:4000/worker');
  return result.data as Worker[];
}

async function getWorker(id: String) {
  const result = await axios.get(`http://localhost:4000/worker/${id}`);
  return result.data as Worker;
}

function addNewWorker(worker: NewWorker) {
  axios.post('http://localhost:4000/worker/create', worker);
}

function removeWorker(worker: Worker) {
  axios.delete(`http://localhost:4000/worker/delete/${worker._id}`)
  .catch((error) => {
    console.error('Error deleting post:', error);
  });
}

function editWorker(worker: Worker) {
  axios.post(`http://localhost:4000/worker/update/${worker._id}`, worker)
  .catch((error) => {
    console.error('Error updating post:', error);
  });
}

export {
  getAllWorkers as getAllWorkers,
  addNewWorker as addNewWorker,
  removeWorker as removeWorker,
  getWorker as getWorker,
  editWorker as editWorker
};
