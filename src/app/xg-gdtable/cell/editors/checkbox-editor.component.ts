import { Component } from '@angular/core';
import { DefaultEditor } from './default-editor';

@Component({
    moduleId:module.id,
    selector: 'checkbox-editor',
    template: `
        <input type="checkbox"
           
              
               [name]="cell.getId()"  
               [disabled]="!cell.isEditable"        
               [checked]="cell.getValue()==(cell.getColumn().getConfig().true||true)"
               (click)="onClick.emit($event)"
               (change)="onChange($event)">
    `,      
})

export class CheckboxEditorComponent extends DefaultEditor {
    inputClass: string='';
    constructor() {
        super();
    }
    onChange(event: any): void {
        const trueValue = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().true) || true;
        const falseValue = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().false) || false;
        this.cell.newValue = event.target.checked ? trueValue : falseValue;
            
    }
   

}
