import { Component, OnInit } from '@angular/core';
import { CompleterService } from 'ng2-completer';
import { DefaultEditor } from './default-editor.component';


@Component({
    moduleId: module.id,
    selector: 'completer-editor',
    template: `
      <ng2-completer [(ngModel)]="completerStr"
                     [dataService]="cell.getColumn().getConfig().completer.dataService"
                     [minSearchLength]="cell.getColumn().getConfig().completer.minSearchLength ||0"
                     [pause]="cell.getColumn().getConfig().completer.pause||0"
                     [placeholder]="cell.getColumn().getConfig().completer.placeholder||'start typing...'"
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
            let config = this.cell.getColumn().getConfig().completer;
            config.dataService = this.completerService.local(config.data, config.searchFields, config.titleField);
            config.dataService.descriptionField(config.descriptionField);
        }
    }
    onEditedCompleter(event: any): boolean {
        this.cell.newValue = event.title;
        return false;
    }

}
