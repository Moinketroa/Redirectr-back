import { OnPut, Route, Request } from '@hapiness/core';
import { Redirectrs } from '../../../interfaces/redirectrs';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import { RedirectrsService } from '../../../services/redirectrs';
import {LightRedirectrSchema, RedirectrSchema} from '../../../schema/redirectrs.schema';

@Route({
    path: '/api/redirectrs/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: LightRedirectrSchema
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                200: RedirectrSchema
            }
        },
        description: 'Update one redirectr',
        notes: 'Updates the redirectr for the given id in path parameter and returns it',
        tags: ['api', 'redirectr']
    }
})
export class PutUpdateRedirectrsRoute implements OnPut {

    constructor(private _redirectrService: RedirectrsService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onPut(request: Request): Observable<Redirectrs> {
        return this._redirectrService.update(request.params.id, request.payload);
    }
}
