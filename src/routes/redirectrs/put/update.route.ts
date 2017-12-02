import { OnPut, Route, Request } from '@hapiness/core';
import { Redirectrs } from '../../../interfaces/redirectrs';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';

@Route({
    path: '/api/redirectrs/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                id: Joi.string().required(),
                title: Joi.string().required(),
                description: Joi.string().required(),
                clicks: Joi.number().required(),
                main_link: Joi.number(),
                links: Joi.array()
            })
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                200: Joi.object().keys({
                    id: Joi.string().required(),
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    clicks: Joi.number().required(),
                    main_link: Joi.number(),
                    links: Joi.array()
                })
            }
        },
        description: 'Update one redirectr',
        notes: 'Updates the redirectr for the given id in path parameter and returns it',
        tags: ['api', 'redirectr']
    }
})
export class PutUpdateRedirectrsRoute implements OnPut {

    constructor() {}

    /**
     * OnGet implementation
     * @param request
     */
    onPut(request: Request): Observable<Redirectrs> {
        return null;
    }
}
