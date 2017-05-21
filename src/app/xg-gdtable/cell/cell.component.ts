import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Cell } from '../data/data-set/index';
import {CellViewModeComponent} from './cell-view-mode/cell-view-mode.component';
import {CellEditModeComponent} from './cell-edit-mode/cell-edit-mode.component';

@Component({
    selector: 'xg-gd-table-cell',
    template: `
    <cell-view-mode *ngIf="!isInEditing" [cell]="cell">
    </cell-view-mode>
    <cell-edit-mode *ngIf="isInEditing" [cell]="cell"
                          [inputClass]="inputClass"
                          (edited)="onEdited($event)">
    </cell-edit-mode>
  `,
})
export class CellComponent {

    @Input() cell: Cell;
    @Input() inputClass: string = '';
    @Input() mode: string = 'inline';
    @Input() isInEditing: boolean = false;

    @Output() edited = new EventEmitter<any>();

    onEdited(event :any): boolean {
        this.edited.emit(event);
        return false;
    }
}