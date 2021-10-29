import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// 1. Import the libs you need
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 2. Add your credentials from step 1
const firebaseConfig = {
  apiKey: "AIzaSyAa6V6UzCGirpanCdN8PTO4psNUHeSIDnQ",
  authDomain: "mslxbcgplatinion.firebaseapp.com",
  projectId: "mslxbcgplatinion",
  storageBucket: "mslxbcgplatinion.appspot.com",
  messagingSenderId: "833622492545",
  appId: "1:833622492545:web:e00a18eb90ae402a325480",
  measurementId: "G-1DQZ5T6RD5"
};

@NgModule({
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }