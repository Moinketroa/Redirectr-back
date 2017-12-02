import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../../../interfaces/redirectrs';

// import * as Joi from 'joi';

@Route({
    path: '/api/redirectrs/top3',
    method: 'GET'
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
