import { OnPost, Route, Request } from '@hapiness/core';
// import { Redirectrs } from '../../../interfaces/redirectrs';
import { Observable } from 'rxjs/Observable';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';

import * as Joi from 'joi';

@Route({
    path: '/api/redirectrs',
    method: 'POST',
    config: {
        validate: {
            payload: Joi.object().keys({
                id: Joi.string().required(),
                title: Joi.string().required(),
                description: Joi.string().required(),
                clicks: Joi.number().required(),
                main_link: Joi.number(),
                links: Joi.array().min(1)
            })
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                201: Joi.object().keys({
                    id: Joi.string().required(),
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    clicks: Joi.number().required(),
                    main_link: Joi.number(),
                    links: Joi.array().min(1)
                })
            }
        },
        description: 'Create one redirectr',
        notes: 'Creates a new redirectr and returns it',
        tags: ['api', 'redirectr']
    }
})
export class PostCreateRedirectrsRoute implements OnPost {

    constructor() {}

    /**
     * OnGet implementation
     * @param request
     */
    onPost(request: Request): Observable<HapinessHTTPHandlerResponse> {
        return null;
    }
}
