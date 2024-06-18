import wallet from "../extensions/users-permissions/server/validators";
import formatValidators from "./format-validators";

const validators = [wallet];

export default formatValidators(validators);
