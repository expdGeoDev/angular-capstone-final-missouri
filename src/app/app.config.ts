import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { UIRouter, UIRouterModule } from '@uirouter/angular';

import { appRouting } from './app.routing';
import { Visualizer } from '@uirouter/visualizer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(
      UIRouterModule.forRoot({ states: appRouting })
    ),
  ],
};
