export default {
  async publicActions(ctx) {
    const { service } = ctx.request.query;

    const actions = await strapi
      .service("api::service.action")
      .findPublicServices(service);
    ctx.send(actions);
  },
};
