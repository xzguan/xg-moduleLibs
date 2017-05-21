
import { DataSet,Column,Row } from './index';
export class Cell {
    newValue: any = '';
    protected static PREPARE = (value: any) => value;

    constructor(protected value: any, protected column: Column, protected row: Row, dataSet: DataSet) {
        this.newValue = value;
    }
    getColumn() {
        return this.column;
    }
    getRow() {

        return this.row;
    }
    getValue() {
        let valid = this.getColumn().getValuePrepareFunction() instanceof Function;
        let prepare = valid ? this.getColumn().getValuePrepareFunction() : Cell.PREPARE;
        return prepare.call(null, this.value, this.row.getData())

    }
    setValue(value: any): any {
        this.newValue = value;
    }
    getId(): string {
        return this.getColumn().key;
    }
    getTitle(): string {
        return this.getColumn().title;
    }
    isEditable(): boolean {
        return this.getColumn().isEditable;
    }

}
