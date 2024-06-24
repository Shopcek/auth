export default async (ctx) => {
  const { id, service } = ctx.request.query;

  const user = await strapi.db.query("plugin::users-permissions.user").findOne({
    where: {
      id,
    },
    populate: {
      role: "*",
      wallet: "*",
      telegram_user: "*",
    },
  });

  if (!user) {
    ctx.throw("User not found!", 403);
  }

  if (!user.role) {
    ctx.throw("Role not found!", 403);
  }

  const permissions = await strapi.entityService.findMany(
    "api::service.action",
    {
      filters: {
        role: user.role.id,
        service: {
          key: service,
        } as any,
      },
    }
  );

  return {
    user,
    permissions: permissions.map((permission) => ({
      action: permission.action,
    })),
  };
};
