import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';
import { Config } from '@hapiness/config';
import { SchemaDefinition } from 'mongoose';

@MongoModel({
    adapter: 'mongoose',
    collection: 'redirectrs',
    options: Config.get('mongodb')
})
export class RedirectrsModel extends Model {
    // property to store schema
    readonly schema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(RedirectrsModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        // create schema
        const redirectrSchemaDefinition: SchemaDefinition = {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            main_link: Number,
            links: Array
        };

        // set schema
        this.schema = new dao.Schema(redirectrSchemaDefinition,
            {
                versionKey: false
            }
        );

        // implement virtual method toJSON to delete _id field
        this.schema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    return ret;
                }
            }
        );
    }
}
