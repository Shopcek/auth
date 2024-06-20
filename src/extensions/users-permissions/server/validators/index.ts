import walletAuth from "./wallet-auth";
import walletRegister from "./wallet-register";
import walletInfo from "./wallet-info";

export default {
  "/auth/wallet": walletAuth,
  "/auth/wallet/register": walletRegister,
  "/auth/wallet-info": walletInfo,
};
