import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../../../interfaces/redirectrs';

// import * as Joi from 'joi';

@Route({
    path: '/api/redirectrs/search',
    method: 'GET'
})
export class GetSearchSearchRedirectrsRoute implements OnGet {

    constructor() {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Redirectrs[]> {
        return null;
    }
}
