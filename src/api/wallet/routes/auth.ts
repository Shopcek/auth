export default {
  routes: [
    {
      method: "POST",
      path: "/wallet/auth",
      handler: "auth.auth",
      config: {
        middlewares: ["plugin::users-permissions.rateLimit"],
        prefix: "",
      },
    },
  ],
};
