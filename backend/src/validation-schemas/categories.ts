import Joi from "joi"

const CATEGORIES = [
  "people",
  "starships",
  "planets",
  "vehicles",
  "species",
  "films",
] as const

export type TCategory = (typeof CATEGORIES)[number]

export const categorySchema = Joi.string<TCategory>()
  .valid(...CATEGORIES)
  .required()
  .messages({
    "any.required": "Category is required",
    "any.only": `Category must be one of: ${CATEGORIES.join(", ")}`,
    "string.empty": "Category cannot be empty",
  })
