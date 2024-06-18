export default [
  {
    method: "POST",
    path: "/auth/wallet",
    handler: "auth.wallet-auth",
    config: {
      middlewares: ["plugin::users-permissions.rateLimit"],
      prefix: "",
    },
  },
];
