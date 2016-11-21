import { Component, OnInit} from "@angular/core";
import { Configuration } from '../../app.config';
import { TestService } from '../../services/test-service';
import {Http} from "@angular/http";

@Component({
    selector: 'test',
    templateUrl: 'test.html',
    providers: [
        Configuration,
        TestService,
        Http
    ]
})
export class TestComponent implements OnInit {
	public myItems: Object [];
    public displayRetour: string = "";

    constructor(private _appConfig: Configuration, private _testService: TestService) {

    };

    public get appConfig(): Configuration {
        return this._appConfig;
    };

    public click(): void {
        console.log("click");
    };

    ngOnInit() {
        console.log("test");
        console.log(this._appConfig.version);
        this.displayRetour = "RETOUR VAR";
        console.log(this.displayRetour);
    };

    clickFunction() {
        console.log("clickFunction :: OK");
        this._testService
            .GetSingle(1)
            .subscribe((data:Object) => console.log(data),
                error => console.log(error),
                () => console.log('Get all Items complete'));
    };
}