import {NgModule, Injectable, Component, OnInit, ModuleWithProviders} from '@angular/core';
import { MaterialModule } from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule, Http, JsonpModule,
 Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {Router, Routes, RouterModule} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { provideInterceptorService, InterceptorService } from 'ng2-interceptors';

import { TranslateService} from './@aduneo/translate/translate.service';
import { TranslatePipe} from './@aduneo/translate/translate.pipe';
import { TRANSLATION_PROVIDERS} from './@aduneo/translate/translate';

import {Configuration, HttpInterceptor} from "./app.config";

import {MainComponent} from "./layouts/main/main.component";


import {AboutComponent} from "./pages/about/about.component";
import {TestComponent} from "./pages/test/test.component";
import {ExDirectiveDirective} from "./directives/exDirective.directive";
import {TestService} from "./services/test-service";

const appRoutes: Routes = [
    {path: '', component: TestComponent},
    {path: 'test', component: TestComponent, data: {title: 'Test'}},
    {path: 'about', component: AboutComponent, data: {title: 'About'}}
];

const appRoutingProviders: any[] = [];
const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
declare  var $:any;
@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        MainComponent,
        TranslatePipe,
        AboutComponent,
        TestComponent,
        ExDirectiveDirective
    ],
    providers: [
        appRoutingProviders,
        { provide: HttpInterceptor,
          useFactory: (backend: XHRBackend, options: RequestOptions, router: Router, appConfig: Configuration) => {
            return new HttpInterceptor(backend, options, router, appConfig);
          },
           deps: [XHRBackend, RequestOptions, Router, Configuration]
        },
        Configuration,
        TRANSLATION_PROVIDERS,
        TranslateService,
        {provide: ConnectionBackend, useClass: XHRBackend},
        Http,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        TestService
    ],
    bootstrap: [MainComponent]
})

export class AppModule {
}