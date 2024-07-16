import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {UIRouterModule} from '@uirouter/angular';
import {routerStates} from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(
      UIRouterModule.forRoot({ states : routerStates })
    ),
  ],
};
