import Joi from "joi";
import { GENDER, INFLECTION_CASE } from "../enums";

export default Joi.object()
  .keys({
    anthroponym: Joi.object()
      .keys({
        firstName: Joi.string()
          .trim()
          .allow(""),
        middleName: Joi.string()
          .trim()
          .allow(""),
        lastName: Joi.string()
          .trim()
          .allow(""),
        gender: Joi.string()
          .valid(Object.values(GENDER))
          .required(),
      })
      .or("firstName", "middleName", "lastName")
      .required(),
    inflectionCase: Joi.string()
      .valid(Object.values(INFLECTION_CASE))
      .required(),
  })
  .required();
