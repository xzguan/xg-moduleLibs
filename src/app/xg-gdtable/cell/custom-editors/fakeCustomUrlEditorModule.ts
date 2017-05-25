import {CustomUrlEditorComponent} from './custom-url-editor.component'
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser'


@NgModule({
    imports:[FormsModule,BrowserModule],
    declarations:[CustomUrlEditorComponent],
    entryComponents:[CustomUrlEditorComponent]

})

export class FakeCustomUrlEditorModule{}