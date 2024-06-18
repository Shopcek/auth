import walletAuth from "./server/controllers/wallet-auth";

export default async (plugin) => {
  plugin.controllers.auth["wallet"] = walletAuth;
  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/auth/wallet",
    handler: "auth.wallet",
    config: {
      middlewares: ["plugin::users-permissions.rateLimit"],
      prefix: "",
    },
  });
  return plugin;
};
