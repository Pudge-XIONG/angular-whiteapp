import {Injectable, Inject} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Configuration, HttpInterceptor } from '../app.config';

@Injectable()
export class TestService {
    private url: string;
    private headers: Headers;

    constructor(private _http: HttpInterceptor, private _configuration: Configuration) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = (): Observable<Object[]> => {
        return this._http.get("/api/datamodel/schema")
            .map((response: Response) => <Object[]>response.json());
            //.catch(this.handleError);
    };

    public GetSingle = (id: number): Observable<Object> => {
        return this._http.get("/api/datamodel/schema")
            .map((response: Response) => <Object>response.json());
            //.catch(this.handleError);
    };

    public Add = (itemName: string): Observable<Object> => {
        let toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post("/api/test", toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json());
            //.catch(this.handleError);
    };

    public Update = (id: number, itemToUpdate: Object): Observable<Object> => {
        return this._http.put("/api/test", JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => <Object>response.json());
            //.catch(this.handleError);
    };

    public Delete = (id: number): Observable<Response> => {
        return this._http.delete("/api/test"); //.catch(this.handleError);
    };

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
};