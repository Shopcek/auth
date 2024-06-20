export default [
  {
    method: "GET",
    path: "/auth/public-permissions",
    handler: "auth.public-permissions",
    config: {
      middlewares: ["plugin::users-permissions.rateLimit"],
      prefix: "",
    },
  },
];
