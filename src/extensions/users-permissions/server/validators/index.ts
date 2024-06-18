import walletAuth from "./wallet-auth";
import walletRegister from "./wallet-register";

export default {
  "/auth/wallet": walletAuth,
  "/auth/wallet/register": walletRegister,
};
