import { html } from 'lit';
import { getRoute } from '../utils/routes';

const NavbarComponent = () => {
  return html`
    <header>
      <nav>
        <ul>
          <li class="nav-list"><a href="/">${getRoute('/').linkLabel}</a></li>
          <li class="nav-list"><a href="/worker">${getRoute('/worker').linkLabel}</a></li>
          <li class="nav-list"><a href="/new">${getRoute('/new').linkLabel}</a></li>
        </ul>
      </nav>
    </header>
  `;
};

export default NavbarComponent;
