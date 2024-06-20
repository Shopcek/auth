import { map } from "lodash/fp";

const getService = (name) => {
  return strapi.plugin("users-permissions").service(name);
};

export default async (ctx) => {
  return await getService("permission")
    .findPublicPermissions()
    .then(map(getService("permission").toContentAPIPermission));
};
