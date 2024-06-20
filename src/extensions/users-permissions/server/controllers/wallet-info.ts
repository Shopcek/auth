import { Context } from "koa";

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

  if (!wallet) {
    ctx.throw("User not found!", 403);
    return;
  }

  if (!wallet.role) {
    ctx.throw("Role not found!", 403);
    return;
  }

  const permissions = await strapi.db
    .query("api::wallet.wallet-permission")
    .findMany({
      where: {
        role: wallet.role.id,
      },
    });

  return {
    user: wallet,
    permissions: permissions.map((permission) => ({
      action: permission.action,
    })),
  };
};
