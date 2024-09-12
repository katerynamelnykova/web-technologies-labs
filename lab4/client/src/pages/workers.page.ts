import { html, render } from 'lit';
import WorkerComponent from '../components/worker.component';
import { getAllWorkers } from '../utils/fetching';

const WorkersPage = (app: HTMLElement) => {
  const document = async () => html`
    <section>
      <h1 class="heading-list">Працівники:</h1>
      <main>
        <ul>
          ${(await getAllWorkers()).reverse().map((worker) => WorkerComponent(worker))}
        </ul>
      </main>
    </section>
  `;

  return document().then((res) => render(res, app));
};

export default WorkersPage;