import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { ToDoHomeComponent } from './to-do-home/to-do-home.component';

import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToDoHomeComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
