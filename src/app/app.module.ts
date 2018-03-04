import { ExtendedInputComponent } from './components/inputs/extended-input/extended-input.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IemailComponent } from './components/inputs/iemail/iemail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/forms/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    IemailComponent,
    SignupComponent,
    ExtendedInputComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
