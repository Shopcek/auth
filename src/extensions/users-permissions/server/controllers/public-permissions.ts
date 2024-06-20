import { map } from "lodash/fp";

const getService = (name) => {
  return strapi.plugin("users-permissions").service(name);
};

export default async (ctx) => {
  return await strapi.entityService.findMany("api::wallet.wallet-permission", {
    filters: { role: { type: "public" } },
  });
};
