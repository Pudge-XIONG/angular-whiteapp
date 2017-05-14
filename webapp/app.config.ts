import { Injectable, Inject } from '@angular/core';
import { TranslateService } from './@jason/translate/translate.service';
import {HttpModule, Http, JsonpModule,
 Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class Configuration {
	private _lang: string = "es";
	private _buildFor: string = "local";
	private _version: string = "0.0.1";
	private _environements: any = {
		local: { name: "local", url: "http://localhost:8080" },
		uat: { name: "uat", url: "https://jsonplaceholder.typicode.com" },
		prod: { name: "prod", url: "http://localhost:8080/services" }
	};
	private _token: string = "";

	public set language(lang:string) {
		this._translate.use(lang);
	}

	constructor(private _translate: TranslateService) {
		this.language = this._lang;
	}

	public get server(): Object {
		return this._environements[this._buildFor];
	}

	public get urlServer(): string {
		return this._environements[this._buildFor].url as string;
	}

	public get version(): Object {
		return {
			version: this._version,
			env: this._buildFor
		};
	}

	public get token(): string{
		return this._token;
	}
};

export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private router:Router, private appConfig: Configuration) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(this.appConfig.urlServer + url, options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(this.appConfig.urlServer + url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(this.appConfig.urlServer + url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(this.appConfig.urlServer + url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Access-Control-Allow-Headers', 'Content-Type');
        options.headers.append('Access-Control-Allow-Methods', '*');
        options.headers.append('Access-Control-Allow-Origin', '*');
        options.headers.append('Content-Type', 'application/json');
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable;
        /*.catch((err, source) => {
            if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
                this._router.navigate(['/login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });*/
    }
};