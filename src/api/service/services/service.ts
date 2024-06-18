/**
 * service service
 */

import { factories, Strapi } from "@strapi/strapi";

const services = ({ strapi }: { strapi: Strapi }) => ({
  async getServiceByKey(key: string) {
    return await strapi.db.query("api::service.service").findOne({
      where: {
        key,
      },
    });
  },
});

export default factories.createCoreService("api::service.service", services);
