import { Component,Input,Output } from '@angular/core';
import { DefaultEditor } from '../editors/default-editor.component';
import { Cell } from '../..//data/data-set/index';



@Component({
    moduleId: module.id,
    selector: 'cell-default-editor',
    //template: `
    //    <custom-editor></custom-editor>
    //`   
    templateUrl:'./cell-default-editor.component.html'
})

export class DefaultEditorComponent extends DefaultEditor {
   
    constructor() {
        super();
    }

    getEditorType(): string {
        
        return this.cell.getColumn().editor.type;
        
    }

}