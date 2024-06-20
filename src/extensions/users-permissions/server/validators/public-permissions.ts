import Joi from "joi";

export default {
  input: null,
  output: null,
  query: Joi.object({
    service: Joi.string().required(),
  }),
};
