import { OnGet, Route, Request } from '@hapiness/core';
import { Redirectrs } from '../../../interfaces/redirectrs';
import { Observable } from 'rxjs/Observable';

// import * as Joi from 'joi';

@Route({
    path: '/api/redirectrs/{id}',
    method: 'GET'
})
export class GetOneRedirectrsRoute implements OnGet {

    constructor() {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Redirectrs> {
        return null;
    }
}
