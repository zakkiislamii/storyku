import Joi from "joi";

export const createSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    writer: Joi.string().required(),
    synopsis: Joi.string().required(),
    cover: Joi.string().required(),
    category: Joi.string()
      .valid("financial", "technology", "health")
      .required(),
    status: Joi.string().valid("publish", "draft").required(),
    tags: Joi.array().items(Joi.string()).required(),
    chapters: Joi.array().required(),
  }),
};

export const updateSchema = {
  params: Joi.object({
    story_id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    title: Joi.string().required(),
    writer: Joi.string().required(),
    synopsis: Joi.string().required(),
    cover: Joi.string().required(),
    category: Joi.string()
      .valid("financial", "technology", "health")
      .required(),
    status: Joi.string().valid("publish", "draft").required(),
    tags: Joi.array().items(Joi.string()).required(),
  }),
};

export const deleteSchema = {
  params: Joi.object({
    story_id: Joi.string().uuid().required(),
  }),
};

export const getAllSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
  }),
};

export const searchSchema = {
  query: Joi.object({
    query: Joi.string().required(),
  }),
};

export const filterSchema = {
  query: Joi.object({
    category: Joi.string()
      .valid("financial", "technology", "health")
      .optional(),
    status: Joi.string().valid("publish", "draft").optional(),
  }).or("category", "status"),
};
