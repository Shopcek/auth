import { Context } from "koa";

export default async (ctx: Context) => {
  const { address, service } = ctx.request.query;

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

  const permissions = await strapi.entityService.findMany(
    "api::wallet.wallet-permission",
    {
      filters: {
        role: wallet.role.id,
        service: {
          key: service,
        },
      },
    }
  );
  console.log(permissions);

  return {
    user: wallet,
    permissions: permissions.map((permission) => ({
      action: permission.action,
    })),
  };
};
