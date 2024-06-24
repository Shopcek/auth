export default [
  {
    method: "GET",
    path: "/user/info",
    handler: "auth.info",
    config: {
      prefix: "",
    },
  },
];
