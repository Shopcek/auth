import JWT from "jsonwebtoken";

export default async (ctx, next) => {
  const { message, signature, service } = ctx.request.body;

  const serviceData = await strapi
    .service("api::service.service")
    .getServiceByKey(service);

  if (!serviceData) {
    ctx.throw("Service not found!", 404);
  }

  const { success, address } = await strapi
    .service("api::wallet.signature")
    .verifySignareture({ message, signature });

  if (!success) {
    ctx.throw("Invalid credentials!", 403);
  }
  const jwt = JWT.sign({ address: address }, serviceData.secretKey, {
    expiresIn: 360,
  });
  ctx.body = {
    jwt,
  };
};
