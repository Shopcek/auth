/**
 *  service
 */

import { factories, Strapi } from "@strapi/strapi";

const services = ({ strapi }: { strapi: Strapi }) => ({
  async findPublicServices(service: string) {
    return await strapi.db.query("api::service.action").findMany({
      where: { role: { type: "public" }, service: { key: service } },
    });
  },
});

export default factories.createCoreService("api::service.action", services);
