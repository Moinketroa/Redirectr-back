import { Injectable } from '@hapiness/core';
import { RedirectrsDocumentService } from '../redirectrs-document/redirectrs-document.service';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../interfaces/redirectrs';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { catchError, flatMap} from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { Biim } from '@hapiness/biim';
import { of } from 'rxjs/observable/of';


@Injectable()
export class RedirectrsService {

    constructor(private _redirectrsDocumentService: RedirectrsDocumentService) {}

    listAll(): Observable<Redirectrs[] | void> {
        return this._redirectrsDocumentService.find();
    }

    one(id: string): Observable<Redirectrs> {
        return this._redirectrsDocumentService.findById(id)
            .pipe(
                catchError(error => _throw(Biim.preconditionFailed(error.message))),
                flatMap(_ => !!_ ? of(_) : _throw(Biim.notFound('Redirectr with id ' + id + ' not found')))
            );
    }

    create(redirectr: Redirectrs): Observable<HapinessHTTPHandlerResponse> {
        return null;
        // return this._redirectrsDocumentService.create(redirectr);
    }

    update(id: string, redirectr: Redirectrs): Observable<Redirectrs> {
        return null;
        // return this._redirectrsDocumentService.findByIdAndUpdate(id, redirectr);
    }

    delete(id: string): Observable<void> {
        return null;
        // return this._redirectrsDocumentService.findByIdAndRemove(id);
    }

    top3(): Observable<Redirectrs[] | void> {
        return null;
        // return this._redirectrsDocumentService.findTop3();
    }

    search(query: string[]): Observable<Redirectrs[] | void> {
        return null;
        // return this._redirectrsDocumentService.search(query);
    }
}
