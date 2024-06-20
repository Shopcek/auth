import routes from "./routes";
import controllers from "./controllers";

export default async (plugin) => {
  plugin.controllers.auth = { ...plugin.controllers.auth, ...controllers };
  plugin.routes["content-api"].routes = [
    ...plugin.routes["content-api"].routes,
    ...routes,
  ];
  return plugin;
};
