import { html } from "lit";
import { Worker } from "../types/index"
import { editWorker } from "../utils/fetching";
import { removeWorker } from "../utils/fetching";

const EditWorkerComponent = (worker: Worker) => {
  let name = worker.name;
  let room = worker.room;
  let department = worker.department;
  let computer = worker.computer;
  

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    
    const newWorker = {
      _id: worker._id,
      name: name,
      room: room,
      department: department,
      computer: computer,
      date: new Date()
    };

    editWorker(newWorker);
  };

  return html`
    <div class="form-box list-box">
    <span class="form-left-side">
      <form @submit=${handleSubmit}>
        <div>
          <label>Прізвище робітника:</label>
          <input
            class="edit-form"
            type="text" 
            id="name" 
            name="name" 
            .value=${name} 
            @input=${(e: InputEvent) => (name = (e.target as HTMLInputElement).value)}
          ><br>
          
          <label>Кімната:</label>
          <input 
            class="edit-form"
            type="text" 
            id="room" 
            name="room" 
            .value=${room} 
            @input=${(e: InputEvent) => (room = (e.target as HTMLInputElement).value)}
          ><br>

          <label>Відділ:</label>
          <input 
            class="edit-form"
            type="text" 
            id="department" 
            name="department" 
            .value=${department} 
            @input=${(e: InputEvent) => (department = (e.target as HTMLInputElement).value)}
          ><br>
          
          <label>Інформація про комп'ютер:</label>
          <input
            class="edit-form"
            type="text" 
            id="computer" 
            name="computer" 
            .value=${computer} 
            @input=${(e: InputEvent) => (computer = (e.target as HTMLInputElement).value)}
          ></input><br>
        </div>
        <button
            type="submit"
            @click=${() => {
            location.reload();
            location.href="http://localhost:3000/worker"
          }}>EDIT</button>
      </form>
      </span>
    </div>
  `;
};

export default EditWorkerComponent;
