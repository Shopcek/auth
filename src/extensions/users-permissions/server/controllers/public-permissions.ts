export default async (ctx) => {
  const { service } = ctx.request.query;
  const publicPermissions = await strapi.entityService.findMany(
    "api::wallet.wallet-permission",
    {
      filters: { role: { type: "public" }, service: { key: service } },
    }
  );

  console.log(publicPermissions);
  return publicPermissions;
};
