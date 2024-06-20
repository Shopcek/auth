import walletAuth from "./wallet-auth";
import walletRegister from "./wallet-register";
import walletInfo from "./wallet-info";
import publicPermissions from "./public-permissions";

export default [
  ...walletAuth,
  ...walletRegister,
  ...walletInfo,
  ...publicPermissions,
];
