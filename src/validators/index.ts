import formatValidators from "./format-validators";

import wallet from "../api/wallet/validators";
import telegram from "../api/telegram/validators";
import service from "../api/service/validators";
import user from "../extensions/users-permissions/server/validators";

const validators = [wallet, telegram, service, user];

export default formatValidators(validators);
