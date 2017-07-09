
import { DataSet,Column,Cell } from './index';

export class Row {

    isSelected: boolean = false;
    isInEditing: boolean = false;
    cells: Array<Cell> = [];
    constructor(public index: number, protected data: any, protected dataSet: DataSet) {
        this.process();
    }

    process(): void {
        this.cells = [];
        this.dataSet.getColumns().forEach((column: Column) => {
            this.cells.push(this.createCell(column));
        })
    }
    getCell(column: Column): Cell {
        return this.cells.find((cell) => cell.getColumn() === column)
    }
    getCells(): Array<Cell> {
        return this.cells;
    }

    getData(): any {
        return this.data;
    }

    getNewData(): any {
        let values = Object.assign({}, this.data);
        this.getCells().forEach((cell) => values[cell.getColumn().key] = cell.newValue);
        return values;
    }
    setData(data: any): any {
        this.data = data;
        this.process();
    }

    createCell(column: Column): Cell {
        let value = this.data[column.key] === undefined ? JSON.parse(JSON.stringify(column.getDefaultValue()))  : this.data[column.key];
        return new Cell(value, column, this);
    }

}