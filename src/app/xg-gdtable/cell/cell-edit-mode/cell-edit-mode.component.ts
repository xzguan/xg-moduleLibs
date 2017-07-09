import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../data/data-set/index';


@Component({
    selector: 'cell-edit-mode',
    
    template: `
          <div [ngSwitch]="getEditorType()">
                <cell-custom-editor *ngSwitchCase="'custom'"
                                          [cell]="cell"
                                          [inputClass]="inputClass"
                                          (edited)="onEdited($event)">
                </cell-custom-editor>
                <cell-default-editor *ngSwitchDefault
                                          [cell]="cell"
                                          [inputClass]="inputClass"
                                          (edited)="onEdited($event)">
                </cell-default-editor>
          </div>
    `
   
})


export class CellEditModeComponent {
    @Input() cell: Cell;
    @Input() inputClass: string;

    @Output() edited = new EventEmitter<any>();

    onEdited(event: any): boolean {

        this.edited.next(event);
        return false;
    }

    getEditorType(): string {
        return this.cell.getColumn().editor.type;
    }

}
