import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Cell } from '../../data/data-set/index';

export class CellCommonEditor {

  @Input() cell: Cell;
  @Input() inputClass: string = '';

  @Output() edited = new EventEmitter<any>();

  onEdited(event): boolean {
    this.edited.next(event);
    return false;
  }

  onStopEditing(): boolean {
    this.cell.getRow().isInEditing = false;
    return false;
  }

  onClick(event): void {
    event.stopPropagation();
  }
}