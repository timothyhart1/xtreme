import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';
import {ApiModule, Configuration} from "../generated/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(),
        importProvidersFrom(
            BrowserAnimationsModule,
            ApiModule.forRoot(() => new Configuration({
                basePath: 'https://localhost:7033'
            }))
        ),
    ]
};
