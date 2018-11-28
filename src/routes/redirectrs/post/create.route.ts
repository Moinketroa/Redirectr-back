import { OnPost, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { HTTPHandlerResponse } from '@hapiness/core/extensions/http-server';

import { RedirectrsService } from '../../../services';
import { Redirectrs } from '../../../interfaces/redirectrs';
import { LightRedirectrSchema, RedirectrSchema } from '../../../schema/redirectrs.schema';

@Route({
    path: '/api/redirectrs',
    method: 'POST',
    config: {
        validate: {
            payload: LightRedirectrSchema
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                201: RedirectrSchema
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
    onPost(request: Request): Observable<HTTPHandlerResponse> {
        return this._redirectrService.create(request.payload as Redirectrs);
    }
}
