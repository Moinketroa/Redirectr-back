import { OnPost, Route, Request } from '@hapiness/core';
// import { Redirectrs } from '../../../interfaces/redirectrs';
import { Observable } from 'rxjs/Observable';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';

// import * as Joi from 'joi';

@Route({
    path: '/api/redirectrs',
    method: 'POST'
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
