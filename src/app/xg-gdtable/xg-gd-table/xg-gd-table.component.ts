import { Component, Input, Output, EventEmitter, SimpleChange, OnChanges,OnInit } from '@angular/core'

import { Grid } from '../data/grid/grid';
import { DataSource } from '../data/datasource/data-source';
import { DataSet, Row } from '../data/data-set/index';

import { deepExtend } from '../../infrastructure/helper'
import {LocalDataSource } from '../data/datasource/local/local-data-source';

@Component({
  selector: 'xg-gd-table',
  templateUrl: './xg-gd-table.component.html',
  styleUrls: ['./xg-gd-table.component.css']
})
export class XgGdTableComponent implements OnInit {

    @Input() source: DataSource;
    @Input() settings: Object = {};
    grid: Grid;

    ngOnInit(){
        this.initGrid();
        
    }
    isAllSelected: boolean = false;

    defaultSettings: Object = {

        mode: 'inline', // inline|external|click-to-edit
        selectMode: 'single', // single|multi
        hideHeader: false,
        hideSubHeader: false,
        actions: {
            columnTitle: 'Actions',
            add: true,
            edit: true,
            delete: true,
            position: 'left' // left|right
        },
        filter: {
            inputClass: '',
        },
        edit: {
            inputClass: '',
            editButtonContent: 'Edit',
            saveButtonContent: 'Update',
            cancelButtonContent: 'Cancel',
            confirmSave: false
        },
        add: {
            inputClass: '',
            addButtonContent: 'Add New',
            createButtonContent: 'Create',
            cancelButtonContent: 'Cancel',
            confirmCreate: false
        },
        delete: {
            deleteButtonContent: 'Delete',
            confirmDelete: false
        },
        attr: {
            id: '',
            class: '',
        },
        noDataMessage: 'No data found',
        columns: {},
        pager: {
            display: true,
            perPage: 5
        }
    };

    @Output() rowSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() userRowSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();
    @Output() create: EventEmitter<any> = new EventEmitter<any>();
    @Output() deleteConfirm: EventEmitter<any> = new EventEmitter<any>();
    @Output() editConfirm: EventEmitter<any> = new EventEmitter<any>();
    @Output() createConfirm: EventEmitter<any> = new EventEmitter<any>();

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {                                 //
        if (this.grid) {
            if (changes['settings']) {
                this.grid.setSettings(this.prepareSettings());
            }
            if (changes['source']) {
                this.grid.setSource(this.source);
            }
        } else {
            this.initGrid();
        }                             
    }
    prepareSettings(): Object {
        return deepExtend({}, this.defaultSettings, this.settings)
    }
    prepareSource(): DataSource {
        if (this.source instanceof DataSource) {
            return this.source;
        } else if (this.source instanceof Array) {
            return new LocalDataSource(this.source);
        }
        return new LocalDataSource();

    }
    initGrid(): void {
        this.source = this.prepareSource();
        this.grid = new Grid(this.source, this.prepareSettings());
        this.grid.onSelectRow().subscribe((row) => {
            this.onSelectRow(row);
        })
    }

    onAdd(event: Event): boolean {
        event.stopPropagation();
        if (this.grid.getSetting('mode') === 'external') {
            this.create.emit({
                source: this.source
            });
        } else {
            this.grid.createFormShown = true;
        }
        return false;
    }
    onCreate(row: Row, event: Event): boolean {
        event.stopPropagation();
        this.grid.create(row, this.createConfirm);
        return false;
    }
    onSave(row: Row, event: Event): boolean {
        event.stopPropagation();
        this.grid.save(row, this.createConfirm);
        return false;
    }
    onDelete(row: Row, event:Event): boolean {
        event.stopPropagation();

        if (this.grid.getSetting('mode') === 'external') {
            this.delete.emit({
                data: row.getData(),
                source: this.source
            });
        } else {
            this.grid.delete(row, this.deleteConfirm);
        }
        return false;
    }

    onEdit(row: Row, event: Event): boolean {
        event.stopPropagation();

        if (this.grid.getSetting('selectMode') === 'multi') {
            this.onMultipleSelectRow(row);
        } else {
            this.onSelectRow(row);
        }

        if (this.grid.getSetting('mode') === 'external') {
            this.edit.emit({
                data: row.getData(),
                source: this.source
            });
        } else {
            this.grid.edit(row);
        }
        return false;
    }
    onClick(event: Event) {
        event.stopPropagation();
    }
    onCancelEdit(row: Row, event: Event): boolean {
        event.stopPropagation();

        row.isInEditing = false;
        return false;
    }

    changePage(event: any) {
        this.resetAllSelector();
    }

    private resetAllSelector() {
        this.isAllSelected = false;
    }
    
    onSelectRow(row: Row): void {
        this.grid.selectRow(row);
        this._onSelectRow(row.getData());
    }

    onUserSelectRow(row: Row): void {
        if (this.grid.getSetting('selectMode') !== 'multi') {
            this.grid.selectRow(row);
            this._onUserSelectRow(row.getData());
            this.onSelectRow(row);
        }
    }
    private _onUserSelectRow(data: any, selected: Array<any> = []) {
        this.userRowSelect.emit({
            data: data || null,
            source: this.source,
            selected: selected.length ? selected : this.grid.getSelectedRows(),
        });
    }
    private _onSelectRow(data: any) {
        this.rowSelect.emit({
            data: data || null,
            source:this.source
        })
    }

    selectAllRows() {
        this.isAllSelected = !this.isAllSelected;
        this.grid.selectAllRows(this.isAllSelected);
        let selectedRows = this.grid.getSelectedRows();

        this._onUserSelectRow(selectedRows[0], selectedRows);
        this._onSelectRow(selectedRows[0]);
    }

    
    onMultipleSelectRow(row: Row): void {
        this._onSelectRow(row.getData());
    }


    sort() {
        this.resetAllSelector()
    }
    filter() {
        this.resetAllSelector();
    }
    
}
