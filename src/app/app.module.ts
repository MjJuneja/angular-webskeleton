import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmailDirective } from './email.directive';
import { FieldtypeDirective } from './fieldtype.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmailDirective,
    FieldtypeDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
