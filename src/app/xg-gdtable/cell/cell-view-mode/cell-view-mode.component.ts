import { Component, Input, ElementRef, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { Cell } from '../../data/data-set/index';





@Component({
    selector: 'cell-view-mode',
    template: `
        <div [ngSwitch]="cell.getColumn().type">
            <div *ngSwitchCase="'html'" #cellContainer [innerHTML]="cell.getValue()"></div>
            <div *ngSwitchDefault #cellContainer >{{cell.getValue()}}</div>
        </div>
    `
})

export class CellViewModeComponent implements OnChanges, AfterViewInit {
    @Input() cell: Cell;
    @ViewChild('cellContainer') cellRef: ElementRef;
    value:any;

    ngOnChanges(changes: any): void {
        setTimeout(() => this.renderCustomValue());                     
    }
    ngAfterViewInit(): void{
        this.renderCustomValue();    
    }

    renderCustomValue(): void {
        const cellRenderFunc = this.cell.getColumn().getCellRenderFunction();

        if (cellRenderFunc && this.cellRef) {
             cellRenderFunc.call(null, this.cell, this.cellRef.nativeElement);
        }

         
    }
}