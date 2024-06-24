export default {
  routes: [
    {
      method: "POST",
      path: "/wallet/auth/register",
      handler: "register.register",
      config: {
        middlewares: ["plugin::users-permissions.rateLimit"],
        prefix: "",
      },
    },
  ],
};
