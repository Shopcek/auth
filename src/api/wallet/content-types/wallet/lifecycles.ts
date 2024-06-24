import isID from "../../../../helpers/is-id";

export default {
  async afterCreate(event) {
    if (isID(event.params.data.user)) {
      return;
    } else if (
      event.params.data.user &&
      event.params.data.user.connect.length !== 0
    ) {
      return;
    }

    await strapi.db.query("plugin::users-permissions.user").create({
      data: {
        wallet: event.result.id,
      },
    });
  },
};
