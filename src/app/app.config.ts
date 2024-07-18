import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {UIRouterModule} from '@uirouter/angular';
import { appRouting} from './app.routing'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(
      UIRouterModule.forRoot({ states : appRouting })
    ),
  ],
};
