import Joi from "joi";

export default {
  input: Joi.object({
    message: Joi.string().required(),
    signature: Joi.string().required(),
    service: Joi.string().required(),
  }),
  output: null,
};
