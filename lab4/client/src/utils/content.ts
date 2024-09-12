import { render } from 'lit';
import { getRoute, type RouteKeys } from "./routes";
import NavbarComponent from '../components/navbar.component';

const app = document.getElementById('app') ?? document.body;

const renderContent = async (path: string) => {
  try {
    const route = getRoute(path as RouteKeys);

    document.title = route.linkLabel;
    
    route.component(app);

    render(NavbarComponent(), document.body);
  } catch (error) {
    throw new Error(`Route '${path}' not found`);
  }
};

const navigate = (e: any) => {
    const route = e.target.pathname;
    history.pushState({}, "", route);
    renderContent(route);
};

const registerBrowserBackAndForth = () => {
  window.onpopstate = async function (_: PopStateEvent) {
    const route = location.pathname;
    await renderContent(route);
  };
};

const renderInitialPage = () => {
  const route = location.pathname;
  renderContent(route);
};

export { navigate, registerBrowserBackAndForth, renderInitialPage };
