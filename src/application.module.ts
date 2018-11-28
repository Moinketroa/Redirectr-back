import { HapinessModule, HttpServerService, OnError, OnStart } from '@hapiness/core';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs/Observable';
import { SwagModule } from '@hapiness/swag';
import { Config } from '@hapiness/config';
import { MongoClientService, MongoModule } from '@hapiness/mongo';

import {
    GetAllRedirectrsRoute,
    GetOneRedirectrsRoute,
    GetSearchSearchRedirectrsRoute,
    PostCreateRedirectrsRoute,
    PutUpdateRedirectrsRoute,
    DeleteOneRedirectrsRoute,
} from './routes';
import {
    RedirectrsService,
    RedirectrsDocumentService
} from './services';
import { RedirectrsModel } from './models';

// factory to declare dependency between RedirectrDocumentService and MongoClientService
// we use it to be sure that MongoClientService will be loaded before RedirectrDocumentService
const redirectrDocumentFactory = (mongoClientService: MongoClientService) => new RedirectrsDocumentService(mongoClientService);

@HapinessModule({
    version: '1.1.0',
    imports: [
        LoggerModule,
        SwagModule.setConfig(Config.get('swag')),
        MongoModule
    ],
    declarations: [
        RedirectrsModel,
        GetAllRedirectrsRoute,
        GetOneRedirectrsRoute,
        GetSearchSearchRedirectrsRoute,
        PostCreateRedirectrsRoute,
        PutUpdateRedirectrsRoute,
        DeleteOneRedirectrsRoute
    ],
    providers: [
        HttpServerService,
        RedirectrsService,
        { provide: RedirectrsDocumentService, useFactory: redirectrDocumentFactory, deps: [MongoClientService]}
    ]
})
export class ApplicationModule implements OnStart, OnError {
    /**
     * Class constructor
     *
     * @param {HttpServerService} _httpServer wrapper for instance of original Hapi server
     * @param {LoggerService} _logger
     */
    constructor(private _httpServer: HttpServerService, private _logger: LoggerService) {}
    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart(): void | Observable<any> {
        this._logger.info(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
    }

    /**
     * On error process
     *
     * @param {Error} error
     * @param data
     *
     * @return {void | Observable<any>}
     */
    onError(error: Error, data?: any): void | Observable<any> {
        this._logger.error('A problem occurred during application\'s lifecycle\n' + error.message + error.stack);
    }
}
