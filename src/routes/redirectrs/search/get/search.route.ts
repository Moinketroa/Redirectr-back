import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../../../interfaces/redirectrs';

import * as Joi from 'joi';
import { RedirectrsService } from '../../../../services/redirectrs/redirectrs.service';

@Route({
    path: '/api/redirectrs/search/{tags}',
    method: 'GET',
    config: {
        validate: {
            params: {
                tags: Joi.string().required()
            }
        },
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
        description: 'Get result of the research',
        notes: 'Returns an array of redirectrs corresponding to the given tags (separated by a \'+\' from each others) or 204 error',
        tags: ['api', 'redirectrs']
    }
})
export class GetSearchSearchRedirectrsRoute implements OnGet {

    constructor(private _redirectrService: RedirectrsService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Redirectrs[] | void> {
        return this._redirectrService.search(request.params.tags.split('+'));
    }
}
