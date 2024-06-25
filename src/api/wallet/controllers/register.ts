import JWT from "jsonwebtoken";

export default {
  async register(ctx, next) {
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

    try {
      await strapi.entityService.create("api::wallet.wallet", {
        data: {
          address,
        },
      });
    } catch (error: any) {
      ctx.throw(
        error.message == "This attribute must be unique"
          ? `${address} is already registered.`
          : error.message,
        400
      );
    }

    const wallet = await strapi.db.query("api::wallet.wallet").findOne({
      where: {
        address,
      },
      populate: {
        user: "*",
      },
    });

    const jwt = JWT.sign({ id: wallet.user.id }, serviceData.secretKey, {
      expiresIn: 5 * 60,
    });
    ctx.body = {
      jwt,
    };
  },
};
