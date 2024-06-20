import { Context } from "koa";
import { map } from "lodash/fp";

const getService = (name) => {
  return strapi.plugin("users-permissions").service(name);
};

export default async (ctx: Context) => {
  const { address } = ctx.request.query;

  const wallet = await strapi.db.query("api::wallet.wallet").findOne({
    where: {
      address,
    },
    populate: {
      role: "*",
    },
  });
  const permissions = await getService("permission")
    .findRolePermissions(wallet.role.id)
    .then(map(getService("permission").toContentAPIPermission));

  return {
    user: wallet,
    permissions,
  };
};
