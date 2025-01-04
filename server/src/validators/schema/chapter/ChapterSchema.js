import Joi from "joi";

export const updateSchema = {
  params: Joi.object({
    chapter_id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

export const deleteSchema = {
  params: Joi.object({
    chapter_id: Joi.string().uuid().required(),
  }),
};

export const getAllSchema = {
  params: Joi.object({
    story_id: Joi.string().uuid().required(),
  }),
};
