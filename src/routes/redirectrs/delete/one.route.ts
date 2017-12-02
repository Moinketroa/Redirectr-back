import { Route, Request, OnDelete } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

// import * as Joi from 'joi';

@Route({
    path: '/api/redirectrs/{id}',
    method: 'DELETE'
})
export class DeleteOneRedirectrsRoute implements OnDelete {

    constructor() {}

    /**
     * OnGet implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return null;
    }
}
