/**
 * telegram-bot service
 */
import { Strapi } from "@strapi/strapi";
export default ({ strapi }: { strapi: Strapi }) => ({
  async findBotFromUsername(username: string) {
    return await strapi.db.query("api::telegram.telegram-bot").findOne({
      where: {
        username,
      },
    });
  },
});
