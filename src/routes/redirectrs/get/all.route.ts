import { OnGet, Route, Request } from '@hapiness/core';
import { Redirectrs } from '../../../interfaces/redirectrs';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import { RedirectrsService } from '../../../services/redirectrs/redirectrs.service';

@Route({
    path: '/api/redirectrs',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
                    id: Joi.string().required(),
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    clicks: Joi.number().required(),
                    main_link: Joi.number(),
                    links: Joi.array()
                    })
                ).unique()
            }
        },
        description: 'Get all redirectrs',
        notes: 'Returns an array of redirectrs or 204 error',
        tags: ['api', 'redirectrs']
    }
})
export class GetAllRedirectrsRoute implements OnGet {

    constructor(private _redirectrService: RedirectrsService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Redirectrs[] | void> {
        return this._redirectrService.listAll();
    }
}
