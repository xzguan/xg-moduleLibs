import { Component , OnInit} from '@angular/core';
import { DefaultEditor } from './default-editor';

@Component({
    selector: 'select-editor',
    template: `
        <select 
            class="form-control" 
            [ngClass]="inputClass"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            [(ngModel)]="cell.newValue"
            (click)="onClick.emit($event)"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit($event)">
            <option *ngFor="let option of cell.getColumn().getEditorConfig()?.list" [value]="option.value"
                [selected]="option.value==cell.getValue()" >{{option.title}}
            </option>
        </select>
    `
})

export class SelectEditorComponent extends DefaultEditor implements OnInit {

    constructor() {
        super();
                        
    }
    ngOnInit(){
        if(!this.cell.newValue){
            this.cell.newValue='Select One'
        }
    }
}