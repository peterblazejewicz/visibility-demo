import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ListComponent } from './list/list.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ListComponent,
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
