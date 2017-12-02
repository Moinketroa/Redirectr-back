import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../../../interfaces/redirectrs';

import * as Joi from 'joi';

@Route({
    path: '/api/redirectrs/top3',
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
                        links: Joi.array().min(1)
                    })
                ).unique().min(1)
            }
        },
        description: 'Get Top 3 redirectrs',
        notes: 'Returns an array of the 3 most trending redirectrs or 204 error',
        tags: ['api', 'redirectrs']
    }
})
export class GetTop3Top3RedirectrsRoute implements OnGet {

    constructor() {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Redirectrs[]> {
        return null;
    }
}
