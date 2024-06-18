import { SiweMessage } from "siwe";

export default async (ctx, next) => {
  const { message, signature, service } = ctx.request.body;

  const siweMessage = new SiweMessage(message);
  const {
    success,
    data: { address },
  } = await siweMessage.verify({ signature });

  ctx.body = {
    address,
    success,
  };
};
