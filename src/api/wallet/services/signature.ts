/**
 * signature service
 */

import { SiweMessage } from "siwe";

export default ({ strapi }) => ({
  async verifySignareture({ message, signature }) {
    const siweMessage = new SiweMessage(message);
    const {
      success,
      data: { address },
    } = await siweMessage.verify({ signature });

    return {
      address,
      success,
    };
  },
});
