import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {Configuration} from '../../app.config';
declare  var $:any;
@Component({
    selector: "main-layout",
    templateUrl: "main.html",
    providers: [
    Configuration
    ]
})
export class MainComponent implements OnInit {

    constructor() { };

    ngOnInit() { };
}