import { OnGet, Route, Request } from '@hapiness/core';
import { Redirectrs } from '../../../interfaces/redirectrs';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import { RedirectrsService } from '../../../services/redirectrs/redirectrs.service';

@Route({
    path: '/api/redirectrs/{id}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
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
        description: 'Get one redirectr',
        notes: 'Returns one redirectr for the given id in path parameter',
        tags: ['api', 'redirectr']
    }
})
export class GetOneRedirectrsRoute implements OnGet {

    constructor(private _redirectrService: RedirectrsService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Redirectrs> {
        return this._redirectrService.one(request.params.id);
    }
}
