import AddWorkerPage from "../pages/addworker.page";
import EditWorkersPage from "../pages/editworkers.page";
import HomePage from "../pages/home.page";
import WorkersPage from "../pages/workers.page";

const routes = {
  '/': {
    linkLabel: 'Home',
    component: HomePage,
  },
  '/worker': {
    linkLabel: 'Працівники',
    component: WorkersPage,
  },
  '/new': {
    linkLabel: 'Додати працівника',
    component: AddWorkerPage,
  },
  '/edit': {
    linkLabel: 'Змінити інформацію про працівників',
    component: EditWorkersPage,
  },
} as const;

type RouteKeys = keyof typeof routes;
type Route = (typeof routes)[RouteKeys];

function getRoute(route: RouteKeys) {
  return routes[route] as Route;
}

export { routes, getRoute, type RouteKeys, type Route };