import Joi from "joi";

export default {
  query: Joi.object({
    service: Joi.string().required(),
  }),
  input: null,
  output: null,
};
