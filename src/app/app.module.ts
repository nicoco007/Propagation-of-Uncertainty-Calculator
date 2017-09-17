import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VariableComponent } from './variable/variable.component';
import {FormsModule} from '@angular/forms';
import { MathJaxDirective } from './mathjax.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    VariableComponent,
    MathJaxDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
