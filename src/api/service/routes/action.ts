export default {
  routes: [
    {
      method: "GET",
      path: "/action/public-actions",
      handler: "action.publicActions",
      config: {
        prefix: "",
      },
    },
  ],
};
