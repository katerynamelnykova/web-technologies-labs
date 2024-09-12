import { html, render } from 'lit';
import EditWorkerComponent from '../components/editworker.component';
import { getAllWorkers } from '../utils/fetching';

const EditWorkersPage = (app: HTMLElement) => {
  const document = async () => html`
    <section>
      <h1 class="heading-list">Працівники:</h1>
      <main>
        <ul>
          ${(await getAllWorkers()).reverse().map((worker) => EditWorkerComponent(worker))}
        </ul>
      </main>
    </section>
  `;

  return document().then((res) => render(res, app));
};

export default EditWorkersPage;