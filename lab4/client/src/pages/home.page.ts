import { html, render } from 'lit';

const HomePage = (app: HTMLElement) => {
  const document = html`

    <section>
      <div class="container">
        <h1 class="main-heading">База даних працівників</h1>
        <img id="cat"
        src="images/laptop_cat.jpg"
        alt=""
      />
      </div>
    </section>
  `;

  return render(document, app);
};

export default HomePage;
