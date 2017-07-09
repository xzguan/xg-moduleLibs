import {Component,Input,Output,EventEmitter} from '@angular/core';
import { CellCommonEditor } from '../cell-common-editor';
import {SelectEditorComponent} from '../../editors/index'
/*import {DefaultEditor} from '../../editors/default-editor'
import {EditCellDefault} from '../edit-cell-default'*/

@Component({
    moduleId: module.id,
    selector: 'cell-default-editor',
    //template: `
    //    <custom-editor></custom-editor>
    //`   
    templateUrl:'./cell-default-editor.component.html'
})

export class CellDefaultEditorComponent  extends CellCommonEditor {
  
    constructor() {
        super()
    }
    getEditorType(): string {
        return this.cell.getColumn().editor.type;
        
    }
     /*onEdited(event): boolean {
        
        this.edited.next(event);
        return false;
  }*/

}
