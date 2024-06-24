import Joi from "joi";

export default {
  input: null,
  output: null,
  query: Joi.object({
    id: Joi.string().required(),
    service: Joi.string().required(),
  }),
};
