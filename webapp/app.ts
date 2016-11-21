///<reference path="../typings/index.d.ts"/>

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {enableProdMode} from '@angular/core';
import {ConnectionBackend} from '@angular/http';

enableProdMode(); //For active angular2 prod_mode
//const platform = platformBrowserDynamic();

platformBrowserDynamic().bootstrapModule(AppModule);