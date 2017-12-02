import { OnPost, Route, Request } from '@hapiness/core';
// import { Redirectrs } from '../../../interfaces/redirectrs';
import { Observable } from 'rxjs/Observable';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';

import * as Joi from 'joi';
import { RedirectrsService } from '../../../services/redirectrs/redirectrs.service';
import { Redirectrs } from '../../../interfaces/redirectrs';

@Route({
    path: '/api/redirectrs',
    method: 'POST',
    config: {
        validate: {
            payload: Joi.object().keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                main_link: Joi.number().required(),
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
                    links: Joi.array()
                })
            }
        },
        description: 'Create one redirectr',
        notes: 'Creates a new redirectr and returns it',
        tags: ['api', 'redirectr']
    }
})
export class PostCreateRedirectrsRoute implements OnPost {

    constructor(private _redirectrService: RedirectrsService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onPost(request: Request): Observable<HapinessHTTPHandlerResponse> {
        return this._redirectrService.create(request.payload as Redirectrs);
    }
}
