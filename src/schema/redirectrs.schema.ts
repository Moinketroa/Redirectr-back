import * as Joi from 'joi';

let RedirectrSchema = Joi.object().keys({
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    main_link: Joi.number(),
    links: Joi.array()
});

let LightRedirectrSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    main_link: Joi.number().required(),
    links: Joi.array().min(1)
});

export { RedirectrSchema, LightRedirectrSchema };
