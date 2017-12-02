import { OnPut, Route, Request } from '@hapiness/core';
import { Redirectrs } from '../../../interfaces/redirectrs';
import { Observable } from 'rxjs/Observable';

// import * as Joi from 'joi';

@Route({
    path: '/api/redirectrs/{id}',
    method: 'PUT'
})
export class PutUpdateRedirectrsRoute implements OnPut {

    constructor() {}

    /**
     * OnGet implementation
     * @param request
     */
    onPut(request: Request): Observable<Redirectrs> {
        return null;
    }
}
