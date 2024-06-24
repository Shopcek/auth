/**
 * telegram-user service
 */

import crypto from "crypto";

const WEB_APP_DATA_CONST = "WebAppData";

function encodeHmac(message, key, repr = undefined) {
  return crypto.createHmac("sha256", key).update(message).digest(repr);
}

function parseTelegramInitData(initData: string) {
  const searchParams = new URLSearchParams(initData);

  const hash = searchParams.get("hash");
  searchParams.delete("hash");

  const restKeys = Array.from(searchParams.entries());
  restKeys.sort(([aKey, aValue], [bKey, bValue]) => aKey.localeCompare(bKey));

  const dataCheckString = restKeys.map(([n, v]) => `${n}=${v}`).join("\n");

  return {
    dataCheckString,
    hash,
    metaData: {
      user: JSON.parse(searchParams.get("user")),
      auth_date: searchParams.get("auth_date"),
      query_id: searchParams.get("query_id"),
    },
  };
}

export default () => ({
  async auth(initData: string, botUsername: string) {
    const authTelegramData = parseTelegramInitData(initData);
    const bot = await strapi
      .service("api::telegram.telegram-bot")
      .findBotFromUsername(botUsername);

    if (!bot) {
      throw new Error("Bot not found!");
    }

    if (!bot.token) {
      throw new Error("Bot has no token!");
    }

    const secretKey = encodeHmac(bot.token, WEB_APP_DATA_CONST);

    const validationKey = encodeHmac(
      authTelegramData.dataCheckString,
      secretKey,
      "hex"
    );

    if (validationKey !== authTelegramData.hash) {
      throw new Error("Validation failure. Bot token or initData not correct.");
    }

    return authTelegramData.metaData.user;
  },
});
