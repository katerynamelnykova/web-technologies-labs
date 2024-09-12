import { html } from "lit";
import { Worker } from "../types/index"
import { removeWorker } from "../utils/fetching";

const WorkerComponent = (worker: Worker) => {
  return html`
    <div class="form-box list-box">
      <span class="form-left-side">
        <label class="list-label">Працівник: ${worker.name}</label>
        <label>Кімната: ${worker.room}</label>
        <label>Відділ: ${worker.department}</label>
        <label>Інформація про комп'ютер: ${worker.computer}</label>
        <label>Дата останнього оновлення: ${worker.date}</label>
      </span>

      <span class="form-right-side">
        <button class="button icon-box">
          <a href="/edit">
          <img
            class="icons"
            src="images/edit.svg"
            alt=""
          /></a>
        </button>
        <button 
          class="button icon-box"
          @click=${() => {
            removeWorker(worker);
            location.reload();
          }}>
          <img
            class="icons"
            src="images/delete.svg"
            alt=""
          />
        </button>
      </span>
    </div>
  `;
};

export default WorkerComponent;
