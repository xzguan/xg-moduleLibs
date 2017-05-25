import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';

import {XgGdtableModule} from './xg-gdtable/xg-gdtable.module'
import {CustomUrlEditorComponent}  from './xg-gdtable/cell/custom-editors/custom-url-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomUrlEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    XgGdtableModule
    
  ],
  entryComponents:[CustomUrlEditorComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
