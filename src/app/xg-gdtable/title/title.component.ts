import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { DataSource } from '../data/datasource/data-source';
import { Column } from '../data/data-set/index';

@Component({
    moduleId: module.id,
    selector: 'xg-gd-table-title',
    styleUrls: ['title.component.css'],
    
    template: `
        <a href="#"
            *ngIf="column.isSortable"
            (click)="_sort()"
            class="xg-gd-table-sort-link sort"
            [ngClass]="currentDirection">
            {{column.title}}
        </a>
       
        <span class="xg-gd-table-sort" *ngIf="!column.isSortable" > {{column.title }}</span>
        
    `
    //template: `
    //    <div (click)="_sort()">Count:{{count}}-- {{currentDirection}}</div>
    //`
})
//<span class="xg-gd-table-sort" * ngIf="column.isSortable" > {{column.title }}</span>

export class TitleComponent implements OnInit {
    @Input() column: Column;
    @Input() source: DataSource;

    @Output() sort = new EventEmitter<any>();

    currentDirection = '';
    count: number = 0;

    add(): boolean {
        this.count++;
        this.changeSortDirection();
        return false;
    }

    ngOnInit(): void {
        this.count++;
        if (this.column.sortDirection) {
            this.currentDirection = this.column.sortDirection;
        }                            
    }

    _sort(): boolean {
        this.count++;
 
        if (this.column.isSortable) {
            
            this.changeSortDirection();
            this.source.setSort([{
                field: this.column.key,
                direction: this.currentDirection,
                compare: this.column.getCompareFunction()
            }])
        }
        this.sort.emit(null);
        return false;
    }
    changeSortDirection(): string {
        if (this.currentDirection) {
            let newDirection = this.currentDirection === 'asc' ? 'desc' : 'asc';
            this.currentDirection = newDirection;
        } else {
            this.currentDirection = this.column.sortDirection;
        }
        return this.currentDirection;
    }



}