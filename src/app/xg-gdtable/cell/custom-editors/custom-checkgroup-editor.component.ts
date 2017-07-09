import { Component } from '@angular/core';
import { DefaultEditor } from '../editors/default-editor';
import {OnInit,OnChanges,SimpleChanges} from '@angular/core';

@Component({
  
    template: `
    
        <div *ngFor="let item of  cell.getValue() ; let i=index"   style="display:inline" >
            <label>
                <input type="checkbox"         
                    [name]="cell.getId()"  
                    [disabled]="!cell.isEditable"  
                    [(ngModel)]="item.value"      
                    [checked]="item.value"
                    (click)="onClick.emit($event)"
                    (change)="onChange($event)">
               {{item.key}}
            </label>
        </div>
        <div *ngFor="let item of cell.getValue()">
            {{item.key}} : {{item.value}}
        </div>
      
        
    `,      
})

export class CustomCheckboxgroupEditorComponent extends DefaultEditor  implements  OnChanges, OnInit{
    inputClass: string='';
   
  
    constructor() {
        
        super();
        
        
    }
    ngOnChanges(changes:SimpleChanges){
        
        
    }
    ngOnInit(){
       
    }

    
    onChange(event: any): void {
        //const trueValue = (this.cell.getColumn().getEditorConfig() && this.cell.getColumn().getEditorConfig().true) || true;
        //const falseValue = (this.cell.getColumn().getEditorConfig() && this.cell.getColumn().getEditorConfig().false) || false;
        //this.cell.newValue = event.target.checked ? trueValue : falseValue;
           
    }
   

}