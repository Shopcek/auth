import JWT from "jsonwebtoken";

export default {
  async auth(ctx) {
    try {
      const { initData, botUsername, service } = ctx.request.body;

      const serviceData = await strapi
        .service("api::service.service")
        .getServiceByKey(service);

      if (!serviceData) {
        ctx.throw("Service not found!", 404);
        return;
      }

      const telegramUser = await strapi
        .service("api::telegram.telegram-user")
        .auth(initData, botUsername);

      let localTelegramUser = await strapi.db
        .query("api::telegram.telegram-user")
        .findOne({
          where: {
            username: telegramUser.username,
          },
          populate: {
            user: "*",
          },
        });

      if (!localTelegramUser) {
        localTelegramUser = await strapi.db
          .query("api::telegram.telegram-user")
          .create({
            data: telegramUser,
            populate: {
              user: "*",
            },
          });

        localTelegramUser = await strapi.db
          .query("api::telegram.telegram-user")
          .findOne({
            where: {
              username: telegramUser.username,
            },
            populate: {
              user: "*",
            },
          });
      }

      ctx.send({
        jwt: JWT.sign(
          { id: localTelegramUser.user.id },
          serviceData.secretKey,
          {
            expiresIn: 360,
          }
        ),
      });
    } catch (err: any) {
      ctx.throw(err.message, 403);
    }
  },
};
