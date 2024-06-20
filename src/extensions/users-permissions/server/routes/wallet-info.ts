export default [
  {
    method: "POST",
    path: "/auth/wallet-info",
    handler: "auth.wallet-info",
    config: {
      middlewares: ["plugin::users-permissions.rateLimit"],
      prefix: "",
    },
  },
];
