import { DataSet } from './data-set';
export class Column {

    title: string = '';
    type: string = '';
    class: string = '';
    isSortable: boolean = false;
    isEditable: boolean = true;
    isFilterable: boolean = false;
    sortDirection: string = '';
    defaultSortDirection: string = '';
    editor: { type: string, config: any, component: any } = { type: '', config: {}, component: null };
    compareFunction: Function;
    valuePrepareFunction: Function;
    filterFunction: Function;
    cellRenderFunction: Function;

    constructor(public key: string, protected setting: any) {
        
        this.process();
    }

    getValuePrepareFunction(): Function {
        return this.valuePrepareFunction;

    }

    getConfig(): any {
        
        return this.editor.config;
    }
    getCompareFunction(): Function {
        return this.compareFunction;
    }
    getValePrepareFunction(): Function {
        return this.getValePrepareFunction;
    }
    getFilterFunction(): Function {
        return this.filterFunction;
    }
    getCellRenderFunction(): Function {
        return this.cellRenderFunction;
    }


    prepareSortDirection(): string {
        return this.setting['sort'] === 'desc' ? 'desc' : 'asc';
    }

    prepareType(): string {
        return this.setting['type'] || this.determineType();
    }
    determineType(): string {
        return 'text';
    }
    process(): void {
        
        this.title = this.setting['title'] !== undefined ? this.setting['title'] : this.title;
        this.type = this.prepareType();
        this.class = this.setting['class'] !== undefined ? this.setting['class'] : this.class;
        this.editor = this.setting['editor'] !== undefined ? this.setting['editor'] : this.editor;

        this.isFilterable = !!this.setting['filter'];
        this.isSortable = !!this.setting['sort'];
        this.defaultSortDirection = ['asc', 'desc'].indexOf(this.setting['defaultSortDirection']) !== -1 ? this.setting['defaultSortDirection'] : '';
        this.sortDirection = this.prepareSortDirection();

        this.compareFunction = this.setting['compareFunction']
        this.valuePrepareFunction = this.setting['valuePrepareFunction'];
        this.filterFunction =  this.setting['filterFunction'];
        this.cellRenderFunction = this.setting['cellRenderFunction'];

    }



}
