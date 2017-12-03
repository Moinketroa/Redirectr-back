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
import { ObjectID } from 'bson';

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
        let oid = new ObjectID;
        if (ObjectID.isValid(id)) {
            oid = ObjectID.createFromHexString(id);
        }
        return fromPromise(this._document.findById(oid))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ? of(doc.toJSON() as Redirectrs) : of(undefined)
                )
            );
    }

    create(redirectr: Redirectrs): Observable<Redirectrs> {
        return fromPromise(this._document.create(redirectr))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON() as Redirectrs)
            );
    }

    findByIdAndUpdate(id: string, redirectr: Redirectrs): Observable<Redirectrs | void> {
        let oid = new ObjectID;
        if (ObjectID.isValid(id)) {
            oid = ObjectID.createFromHexString(id);
        }
        return fromPromise(this._document.findByIdAndUpdate(oid, redirectr, { new: true }))
            .pipe(
                flatMap((doc: MongooseDocument) => !!doc ? of(doc.toJSON() as Redirectrs) : of(undefined))
            );
    }

    findByIdAndRemove(id: string): Observable<Redirectrs | void> {
        let oid = new ObjectID;
        if (ObjectID.isValid(id)) {
            oid = ObjectID.createFromHexString(id);
        }
        return fromPromise(this._document.findByIdAndRemove(oid))
            .pipe(
                flatMap((doc: MongooseDocument) => !!doc ? of(doc.toJSON() as Redirectrs) : of(undefined))
            );
    }

    findTop3(): Observable<Redirectrs[] | void> {
        return fromPromise(this._document.find({}).sort({clicks: -1}).limit(3))
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

    search(query: string[]): Observable<Redirectrs[] | void> {
        let rule = [];
        query.forEach((tag: string) => rule.push({title: {'$regex' : tag, '$options' : 'i'}}));
        query.forEach((tag: string) => rule.push({description: {'$regex' : tag, '$options' : 'i'}}));

        return fromPromise(this._document.find().or(rule))
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
}
