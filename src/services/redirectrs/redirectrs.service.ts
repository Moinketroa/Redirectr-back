import { Injectable } from '@hapiness/core';
import { RedirectrsDocumentService } from '../redirectrs-document';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../interfaces/redirectrs';
import { HTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { catchError, flatMap, map } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { Biim } from '@hapiness/biim';
import { of } from 'rxjs/observable/of';


@Injectable()
export class RedirectrsService {

    constructor(private _redirectrsDocumentService: RedirectrsDocumentService) {}

    listAll(): Observable<Redirectrs[] | void> {
        return this._redirectrsDocumentService.find().pipe(
            catchError(error => _throw(Biim.internal(error.message))),
            flatMap(_ => !!_ ? of(_) : _throw(Biim.notFound('No Redirectr found')))
        );
    }

    one(id: string): Observable<Redirectrs> {
        return this._redirectrsDocumentService.findById(id)
            .pipe(
                catchError(error => _throw(Biim.internal(error.message))),
                flatMap(_ => !!_ ? of(_) : _throw(Biim.notFound('Redirectr with id ' + id + ' not found')))
            );
    }

    create(redirectr: Redirectrs): Observable<HTTPHandlerResponse> {
        return this._redirectrsDocumentService.create(redirectr)
            .pipe(
                catchError(error => _throw(Biim.conflict(error.message))),
                map(_ => ({ response: _, statusCode: 201}))
            );
    }

    update(id: string, redirectr: Redirectrs): Observable<Redirectrs> {
        return this._redirectrsDocumentService.findByIdAndUpdate(id, redirectr)
            .pipe(
                catchError(error => _throw(Biim.internal(error.message))),
                flatMap(_ => !!_ ? of(_) : _throw(Biim.notFound('Redirectr with id ' + id + ' not found')))
            );
    }

    delete(id: string): Observable<void> {
        return this._redirectrsDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(error => _throw(Biim.internal(error.message))),
                flatMap(_ => !!_ ? of(undefined) : _throw(Biim.notFound('Redirectr with id ' + id + ' not found')))
            );
    }

    search(query: string[]): Observable<Redirectrs[] | void> {
        return this._redirectrsDocumentService.search(query)
            .pipe(
                catchError(error => _throw(Biim.internal(error.message))),
                flatMap(_ => !!_ ? of(_) : _throw(Biim.notFound('No Redirectr were found for the tags : ' + query)))
            );
    }
}
