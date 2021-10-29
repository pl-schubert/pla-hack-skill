import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// 1. Import the libs you need
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyAqTD-vs390HDmi1_YUJd-QZLEOT8MMG2A",
  authDomain: "msf-bcg-platinion.firebaseapp.com",
  projectId: "msf-bcg-platinion",
  storageBucket: "msf-bcg-platinion.appspot.com",
  messagingSenderId: "1099372300211",
  appId: "1:1099372300211:web:d01231ecc8625cda43edc6",
  measurementId: "G-DE8QMTZTNX"
};

@NgModule({
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(config)),
    provideFirestore(() => getFirestore()),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }