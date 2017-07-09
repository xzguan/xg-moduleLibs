import { Component, OnInit } from '@angular/core';
import { CompleterService } from 'ng2-completer';
import { DefaultEditor } from './default-editor';


@Component({
    moduleId: module.id,
    selector: 'completer-editor',
    template: `
      <ng2-completer [(ngModel)]="completerStr"
                     [dataService]="cell.getColumn().getEditorConfig().completer.dataService"
                     [minSearchLength]="cell.getColumn().getEditorConfig().completer.minSearchLength ||0"
                     [pause]="cell.getColumn().getEditorConfig().completer.pause||0"
                     [placeholder]="cell.getColumn().getEditorConfig().completer.placeholder||'start typing...'"
                     (selected)="onEditedCompleter($event)">
     </ng2-completer>                     
    `
})

export class CompleterEditorComponent extends DefaultEditor implements OnInit {

    completerStr: string = '';
    constructor(private completerService: CompleterService) {
        super();
    }

    ngOnInit() {
        if (this.cell.getColumn().editor && this.cell.getColumn().editor.type === 'completer') {
            let config = this.cell.getColumn().getEditorConfig().completer;
            config.dataService = this.completerService.local(config.data, config.searchFields, config.titleField);
            config.dataService.descriptionField(config.descriptionField);
        }
    }
    onEditedCompleter(event: any): boolean {
        this.cell.newValue = event.title;
        return false;
    }

}
