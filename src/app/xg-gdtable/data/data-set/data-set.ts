
import { Row,Column } from './index'; 
export class DataSet {
    protected data: Array<any> = [];
    protected columns: Array<Column> = [];
    protected rows: Array<Row> = [];

    protected selectedRow: Row;
    protected willSelect: string = 'first';

    newRow: Row;

    constructor(data: Array<any>, columnSettings: Object) {
        this.createColumns(columnSettings);
        this.setData(data);
        this.createNewRow();

    }
    
    createColumns(setting: Object) {
        Object.keys(setting).forEach((key)=>{
            this.columns.push(new Column(key,setting[key]));
        })
    }
     
    createNewRow() {
        
        this.newRow = new Row(0, {}, this);
        this.newRow.isInEditing = true;
    }

    setData(data: Array<any>) {
        this.data = data;
        this.createRows();
    }
    createRows() {
        this.rows = [];
        this.data.forEach((el, index) => {
            this.rows.push(new Row(index, el, this));
        })
    }

    

    getColumns(): Array<Column> {
        return this.columns;
    }
    getRows(): Array<Row> {
        return this.rows;
    }

    findRowByData(data: any): Row {
        return this.rows.find((row) => row.getData() === data);
    }

    deselectAll(): void {
        this.rows.forEach((row) => {
            row.isSelected = false;
        })
    }
    selectRow(row: Row): Row {
        this.deselectAll();
        row.isSelected = true;
        this.selectedRow = row;
        return this.selectedRow;
    }

    multipleSelectRow(row: Row): Row {
        row.isSelected = !row.isSelected;
        this.selectedRow=row;
        return this.selectedRow;
    }

    selectPreviousRow(): Row {
        if (this.rows.length > 0) {
            let index = this.selectedRow ? this.selectedRow.index : 0;
            if (index > 0) {
                index = index - 1;
            }
            return this.selectRow(this.rows[index]);
        }

    }
    selectNextRow(): Row {
        if (this.rows.length > 0) {
            let index = this.selectedRow ? this.selectedRow.index : 0;
            index = this.rows.length - 1 <= index ? index : index + 1;
            return this.selectedRow = this.selectRow(this.rows[index]);
        }
    }
    selectFirstRow(): Row {
        if (this.rows.length > 0) {
            this.selectedRow = this.selectRow(this.rows[0]);
            return this.selectedRow;
        }
    }
    selectLastRow(): Row {
        if (this.rows.length > 0) {
            this.selectedRow = this.selectRow(this.rows[this.rows.length - 1]);
            return this.selectedRow;
        }
    }

    willSelectFirstRow(): void {
        this.willSelect = 'first';
    }
    willSelectLastRow(): void {
        this.willSelect = 'last';
    }

    select(): Row {
        if (this.getRows().length === 0) {
            return;
        }
        if (this.willSelect) {
            if (this.willSelect === 'first') {
                this.selectFirstRow();
            }
            if (this.willSelect === 'last') {
                this.selectLastRow();
            }
            this.willSelect = '';
        } else {
            this.selectFirstRow();
        }
        return this.selectedRow;

    }



    
    
    

}