import { DataSet, Cell, Column, Row } from '../data-set/index';
import { EventEmitter } from '@angular/core';

import { DataSource } from '../datasource/data-source';
import { getDeepFromObject, Deferred } from '../../../infrastructure/helper';
import { Subject, Observable } from 'rxjs/rx';

export class Grid {
    source: DataSource;
    settings: any;
    dataSet: DataSet;

    onSelectRowSource = new Subject<any>();
    createFormShown: boolean = true;

    constructor(source: DataSource, settings: any) {
        this.setSettings(settings);
        this.setSource(source);
        
    }

    getSetting(name: string, defaultValue?: any): any{
        return getDeepFromObject(this.settings, name,defaultValue)        
    }
    setSettings(setting: Object): void {
        this.settings = setting;
        this.dataSet = new DataSet([], this.getSetting('columns'));
    }
    setSource(source: DataSource): void {
        this.source = this.prepareSource(source);
        this.source.onChanged().subscribe((changes) => this.processDataChange(changes));
        this.source.onUpdated().subscribe((data) => {
            let changedRow = this.dataSet.findRowByData(data);
            changedRow.setData(data);
        })
    }
    prepareSource(source: DataSource): DataSource {
        let initialSort = this.getInitialSort();
        if (initialSort) {
            source.setSort(initialSort, false);
        }
        if (this.getSetting('pager.display') === true) {
            source.setPaging(1, this.getSetting('pager.perPage'), false);
        }
        source.refresh();
        return source;
    }
    getInitialSort():Array<any> {
        let sortConfs:Array<any> = [];
        this.getColumns().forEach((column: Column) => {
            if (column.isSortable && column.defaultSortDirection) {
                let sortConf = {};
                sortConf['field'] = column.key;
                sortConf['direction'] = column.defaultSortDirection;
                sortConf['compare'] = column.getCompareFunction();
                sortConfs.push(sortConf);
            }
        })
        return sortConfs;
    }
    getColumns(): Array<Column> {
        return this.dataSet.getColumns();
    }

    getRows(): Array<Row> {
        return this.dataSet.getRows();
    }

    getNewRow(): Row {
        return this.dataSet.newRow;
    }
    selectRow(row: Row) :void {
        this.dataSet.selectRow(row);
    }
    multipleSelectRow(row: Row) :void {
        this.dataSet.multipleSelectRow(row);
    }

    onSelectRow(): Observable<any> {
        return this.onSelectRowSource.asObservable();
    }

    edit(row: Row): void {
        row.isInEditing = true;
    }

    create(row: Row, confirmEmitter: EventEmitter<any>): void {
        let deferred = new Deferred();
        deferred.promise.then((data) => {
            data = data ? data : row.getNewData();
            this.source.prepend(data).then(() => {
                this.createFormShown = false;
                this.dataSet.createNewRow();
            }).catch((err) => { })

        });
        if (this.getSetting('add.confirmCreate')) {
            confirmEmitter.emit({
                newData: row.getNewData(),
                source: this.source,
                confirm: deferred
            });
        } else {
            deferred.resolve();
        }
        
    }


    save(row: Row, confirmEmit: EventEmitter<any>): void {
        let deferred = new Deferred();
        deferred.promise.then((newData) => {
            newData = newData ? newData : row.getNewData();
            this.source.update(row.getData(), newData).then(() => {
                row.isInEditing = false;
            })
        }).catch((err) => { });
        if (this.getSetting('edit.confirmSave')) {
            confirmEmit.emit({
                data: row.getData(),
                newData: row.getNewData(),
                source: this.source,
                confirm: deferred
            });
        } else {
            deferred.resolve();
           
        }      
    }

    delete(row: Row, confirmEmit: EventEmitter<any>) {
        let deferred = new Deferred();
        deferred.promise.then(() => {
            this.source.remove(row.getData());
        }).catch((err) => { });

        if (this.getSetting('delete.confirmDelete')) {
            confirmEmit.emit({
                data: row.getData(),
                source: this.source,
                confirm: deferred
            });
                
        } else {
            deferred.resolve();
        }
        
    }





    processDataChange(changes: any): void {
        if (this.shouldProcessChange(changes)) {
            this.dataSet.setData(changes['elements']);
            if (this.getSetting('selectMode') !== 'multi') {
                let row = this.determineRowToSelect(changes);
                if (row) {
                    this.onSelectRowSource.next(row);
                }
            }
            
        }

    }

    determineRowToSelect(changes:any): Row {
        if (['load', 'page', 'filter', 'sort', 'refresh'].indexOf(changes['action']) !== -1) {
            return this.dataSet.select();
        }
        if (changes['action'] === 'remove') {
            if (changes['elements'].length === 0) {
                this.dataSet.selectLastRow();
            } else {
                return this.dataSet.selectPreviousRow();
            }
        }
        if (changes['action'] === 'append') {
            return this.dataSet.selectLastRow();
        }
        if (['add', 'update', 'prepend'].indexOf(changes['action']) !== -1) {
            return this.dataSet.selectFirstRow();
        }
        return null;

    }
    shouldProcessChange(changes:any): boolean {
        if (['filter', 'sort', 'page', 'remove', 'refresh', 'load', 'paging'].indexOf(changes['action']) !== -1) {
            return true;
        } else if
        (['prepend', 'append'].indexOf(changes['action']) !== -1 && this.getSetting['pager.display']) {
            return true;
        }
        return false;
        
    }
    
   
    
    getInitialFilter(): Array<any> {
        return [];
    }
    isMultiSelectVisible(): boolean {
        return this.getSetting('selectMode') === 'multi';
    }
    isCurrentActionsPosition(position: string): boolean {
        return position == this.getSetting('actions.position')
    }

    isActionsVisible(): boolean {
        return this.getSetting('actions.add') || this.getSetting('actions.edit') || this.getSetting('actions.delete');
    }

    
    showActionColumn(position: string): boolean {
        return this.isCurrentActionsPosition(position) && this.isActionsVisible();
    }
    getSelectedRows(): Array<any> {
        return this.dataSet.getRows()
            .filter(r => r.isSelected)
            .map(r => r.getData());
    }
    selectAllRows(status: boolean) {
        this.dataSet.getRows().forEach((row) => {
            row.isSelected = status;
        })
    }
}