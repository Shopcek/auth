export default async (ctx, next) => {
  const { message, signature, service } = ctx.request.body;

  const { success, address } = await strapi
    .service("api::wallet.signature")
    .verifySignareture({ message, signature });

  ctx.body = {
    address,
    success,
  };
};
