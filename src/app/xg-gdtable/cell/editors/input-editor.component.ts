import { Component } from '@angular/core';
import { DefaultEditor } from './default-editor';

@Component({
    moduleId:module.id,
    selector: 'input-editor',
    template: `
         <input type="text"
                class="form-control"
                [(ngModel)]="cell.newValue"
                [name]="cell.getId()"
                [placeholder]="cell.getTitle()"
                [disabled]="!cell.isEditable()"
                (click)="onClick.emit($event)"
                (keydown.enter)="onEdited.emit($event)"
                (keydown.esc)="onStopEditing.emit($event)" >            
        `,
})

export class InputEditorComponent extends DefaultEditor {

    constructor() {
        super();
    }
}

