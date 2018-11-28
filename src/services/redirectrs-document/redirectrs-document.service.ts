import { Injectable } from '@hapiness/core';
import { RedirectrsModel } from '../../models/redirectrs/redirectrs.model';
import { MongoClientService } from '@hapiness/mongo';
import { Config } from '@hapiness/config';
import { Observable } from 'rxjs/Observable';
import { Redirectrs } from '../../interfaces/redirectrs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { MongooseDocument } from 'mongoose';
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
        return fromPromise(this._document.find())
            .filter((docs: MongooseDocument[]) => !!docs && docs.length > 0)
            .map((docs: MongooseDocument[]) => docs.map(doc => doc.toJSON() as Redirectrs))
            .defaultIfEmpty(undefined);
    }

    findById(id: string): Observable<Redirectrs | void> {
        return fromPromise(this._document.findById(this._objectIdFromString(id)))
            .filter((doc: MongooseDocument) => !!doc)
            .map((doc: MongooseDocument) => doc.toJSON() as Redirectrs)
            .defaultIfEmpty(undefined);
    }

    create(redirectr: Redirectrs): Observable<Redirectrs> {
        return fromPromise(this._document.create(redirectr))
            .map((doc: MongooseDocument) => doc.toJSON() as Redirectrs);
    }

    findByIdAndUpdate(id: string, redirectr: Redirectrs): Observable<Redirectrs | void> {
        return fromPromise(this._document.findByIdAndUpdate(this._objectIdFromString(id), redirectr, { new: true }))
            .filter((doc: MongooseDocument) => !!doc)
            .map((doc: MongooseDocument) => doc.toJSON() as Redirectrs)
            .defaultIfEmpty(undefined);
    }

    findByIdAndRemove(id: string): Observable<Redirectrs | void> {
        return fromPromise(this._document.findByIdAndRemove(this._objectIdFromString(id)))
            .filter((doc: MongooseDocument) => !!doc)
            .map((doc: MongooseDocument) => doc.toJSON() as Redirectrs)
            .defaultIfEmpty(undefined);
    }

    search(query: string[]): Observable<Redirectrs[] | void> {
        const rule = [];
        query.forEach((tag: string) => rule.push({title: {'$regex' : tag, '$options' : 'i'}}));
        query.forEach((tag: string) => rule.push({description: {'$regex' : tag, '$options' : 'i'}}));

        return fromPromise(this._document.find().or(rule))
            .filter((docs: MongooseDocument[]) => !!docs && docs.length > 0)
            .map((docs: MongooseDocument[]) => docs.map(doc => doc.toJSON() as Redirectrs))
            .defaultIfEmpty(undefined);
    }

    private _objectIdFromString(id: string): ObjectID {
        return ObjectID.isValid(id) ? ObjectID.createFromHexString(id) : new ObjectID;
    }
}
