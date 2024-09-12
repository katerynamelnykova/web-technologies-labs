import { html, render } from 'lit';
import { addNewWorker } from '../utils/fetching';

const AddWorkerPage = (app: HTMLElement) => {
  let name = '';
  let room = '';
  let department = '';
  let computer = '';

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    
    const newWorker = {
      name: name,
      room: room,
      department: department,
      computer: computer,
      date: new Date()
    };

    addNewWorker(newWorker);
  };

  const document = html`
    <section>
      <div class="centered-div">
        <h1>Додайте працівника:</h1>
      </div>
      <form @submit=${handleSubmit}>
        <div class="form-box add-page-box">
          <label>Прізвище робітника</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            .value=${name} 
            @input=${(e: InputEvent) => (name = (e.target as HTMLInputElement).value)}
          ><br>
          
          <label>Кімната</label>
          <input 
            type="text" 
            id="room" 
            name="room" 
            .value=${room} 
            @input=${(e: InputEvent) => (room = (e.target as HTMLInputElement).value)}
          ><br>

          <label>Відділ</label>
          <input 
            type="text" 
            id="department" 
            name="department" 
            .value=${department} 
            @input=${(e: InputEvent) => (department = (e.target as HTMLInputElement).value)}
          ><br>
          
          <label>Інформація про комп'ютер</label>
          <textarea 
            id="computer" 
            name="computer" 
            .value=${computer} 
            @input=${(e: InputEvent) => (computer = (e.target as HTMLInputElement).value)}
          ></textarea><br>
          
          <button
            type="submit"
            @click=${() => {
            location.reload();
            location.href="http://localhost:3000/worker"
          }}>SUBMIT</button>
        </div>
      </form>
    </section>
  `;

  return render(document, app);
};

export default AddWorkerPage;
