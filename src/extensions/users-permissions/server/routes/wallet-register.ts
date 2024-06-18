export default [
  {
    method: "POST",
    path: "/auth/wallet/register",
    handler: "auth.wallet-register",
    config: {
      middlewares: ["plugin::users-permissions.rateLimit"],
      prefix: "",
    },
  },
];
