import { OnPut, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import { Redirectrs } from '../../../../interfaces/redirectrs';
import { RedirectrsService } from '../../../../services/redirectrs/redirectrs.service';

@Route({
    path: '/api/redirectrs/access/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
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
        description: 'Access one redirectr',
        notes: 'Updates the redirectr\'s clicks counter for the given id in path parameter and returns it',
        tags: ['api', 'redirectr', 'access']
    }
})
export class PutAccessRedirectrsRoute implements OnPut {

    constructor(private _redirectrService: RedirectrsService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onPut(request: Request): Observable<Redirectrs> {
        return this._redirectrService.access(request.params.id, request.payload);
    }
}