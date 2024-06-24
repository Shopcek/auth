import auth from "./auth";
import register from "./register";
import info from "./info";

export default {
  "/wallet/auth": auth,
  "/wallet/auth/register": register,
  "/user/info": info,
};
