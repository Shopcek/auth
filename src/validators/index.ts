import walletAuth from "../extensions/users-permissions/server/validators";
import formatValidators from "./format-validators";

const validators = [walletAuth];

export default formatValidators(validators);
