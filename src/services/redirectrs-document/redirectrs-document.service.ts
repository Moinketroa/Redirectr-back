import { Injectable } from '@hapiness/core';
import { RedirectrsModel } from '../../models/redirectrs/redirectrs.model';
import { MongoClientService } from '@hapiness/mongo';
import { Config } from '@hapiness/config';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../interfaces/redirectrs';

@Injectable()
export class RedirectrsDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({
            adapter: 'mongoose',
            options: Config.get('mongodb')
        }, RedirectrsModel);
    }

    find(): Observable<Redirectrs[] | void> {
        return null;
    }

    findById(id: string): Observable<Redirectrs | void> {
        return null;
    }

    create(redirectr: Redirectrs): Observable<Redirectrs> {
        return null;
    }

    findByIdAndUpdate(id: string, redirectr: Redirectrs): Observable<Redirectrs | void> {
        return null;
    }

    findByIdAndRemove(id: string): Observable<Redirectrs | void> {
        return null;
    }

    findTop3(): Observable<Redirectrs[] | void> {
        return null;
    }

    search(query: string[]): Observable<Redirectrs[] | void> {
        return null;
    }
}
