import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { withViewTransitions } from '@angular/router';

import { EnvironmentProviders } from '@angular/core';
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes, withComponentInputBinding()),
//   importProvidersFrom(HttpClientModule)importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"criptotracker-angular","appId":"1:794583741368:web:5d4d3a71f773b6274e554d","storageBucket":"criptotracker-angular.appspot.com","apiKey":"AIzaSyDOo7Ou89sIgHayq7IxX0SYCeyumqFAo34","authDomain":"criptotracker-angular.firebaseapp.com","messagingSenderId":"794583741368","measurementId":"G-2CLHLHV1CX"})))importProvidersFrom(provideAuth(() => getAuth()))importProvidersFrom(provideFirestore(() => getFirestore())),
//   ]
// };


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,  withComponentInputBinding()) ,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"criptotracker-angular","appId":"1:794583741368:web:5d4d3a71f773b6274e554d","storageBucket":"criptotracker-angular.appspot.com","apiKey":"AIzaSyDOo7Ou89sIgHayq7IxX0SYCeyumqFAo34","authDomain":"criptotracker-angular.firebaseapp.com","messagingSenderId":"794583741368","measurementId":"G-2CLHLHV1CX"}))),
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideFirestore(() => getFirestore()))
    
    // importProvidersFrom(provideDatabase(() => getDatabase())),
  ]


}