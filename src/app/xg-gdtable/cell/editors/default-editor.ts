import { Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../data/data-set/index';

export class DefaultEditor implements Editor {
    @Input() cell: Cell;                            
    @Input() inputClass: string;
    @Output() onStopEditing: EventEmitter<any> = new EventEmitter<any>();
    @Output() onEdited: EventEmitter<any>= new EventEmitter<any>();
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
}



export interface Editor {
    cell: Cell;
    inputClass: string;
    onStopEditing: EventEmitter<any>;
    onEdited: EventEmitter<any>;
    onClick: EventEmitter<any>;
}
