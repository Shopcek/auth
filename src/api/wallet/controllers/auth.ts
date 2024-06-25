import JWT from "jsonwebtoken";

export default {
  async auth(ctx, next) {
    const { message, signature, service } = ctx.request.body;

    const serviceData = await strapi
      .service("api::service.service")
      .getServiceByKey(service);

    if (!serviceData) {
      ctx.throw("Service not found!", 404);
      return;
    }

    const { success, address } = await strapi
      .service("api::wallet.signature")
      .verifySignareture({ message, signature });

    if (!success) {
      ctx.throw("Invalid credentials!", 403);
      return;
    }

    const wallet = await strapi.db.query("api::wallet.wallet").findOne({
      where: {
        address,
      },
      populate: {
        user: "*",
      },
    });

    if (!wallet) {
      ctx.throw("User not found! Please register first.", 400);
      return;
    }

    ctx.body = {
      jwt: JWT.sign({ id: wallet.user.id }, serviceData.secretKey, {
        expiresIn: 360,
      }),
    };
  },
};
