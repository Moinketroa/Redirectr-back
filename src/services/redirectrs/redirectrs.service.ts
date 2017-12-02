import { Injectable } from '@hapiness/core';
import { RedirectrsDocumentService } from '../redirectrs-document/redirectrs-document.service';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../interfaces/redirectrs';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';


@Injectable()
export class RedirectrsService {

    constructor(private _redirectrsDocumentService: RedirectrsDocumentService) {}

    listAll(): Observable<Redirectrs[] | void> {
        return this._redirectrsDocumentService.find();
    }

    one(id: string): Observable<Redirectrs> {
        return null;
        // return this._redirectrsDocumentService.findById(id);
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
