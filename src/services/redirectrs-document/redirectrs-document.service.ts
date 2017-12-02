import { Injectable } from '@hapiness/core';
import { RedirectrsModel } from '../../models/redirectrs/redirectrs.model';
import { MongoClientService } from '@hapiness/mongo';
import { Config } from '@hapiness/config';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../interfaces/redirectrs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { filter, flatMap, map } from 'rxjs/operators';
import { MongooseDocument } from 'mongoose';
import { of } from 'rxjs/observable/of';
import { mergeStatic } from 'rxjs/operators/merge';

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
        return fromPromise(this._document.find({}))
            .pipe(
                flatMap((docs: MongooseDocument[]) =>
                    of(of(docs))
                        .pipe(
                            flatMap(_ => mergeStatic(
                                _.pipe(
                                    filter(__ => !!__ && __.length > 0),
                                    map(__ => __.map(doc => doc.toJSON()))
                                ),
                                _.pipe(
                                    filter(__ => !__ || __.length === 0),
                                    map(__ => undefined)
                                )
                            ))
                        )
                )
            );
    }

    findById(id: string): Observable<Redirectrs | void> {
        return fromPromise(this._document.findById(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ? of(doc.toJSON() as Redirectrs) : of(undefined)
                )
            )
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
