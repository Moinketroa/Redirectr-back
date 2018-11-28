import { Route, Request, OnDelete } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import { RedirectrsService } from '../../../services/redirectrs';

@Route({
    path: '/api/redirectrs/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete redirectr',
        notes: 'Delete one redirectr for the given id in path parameter',
        tags: ['api', 'redirectr']
    }
})
export class DeleteOneRedirectrsRoute implements OnDelete {

    constructor(private _redirectrService: RedirectrsService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._redirectrService.delete(request.params.id);
    }
}
