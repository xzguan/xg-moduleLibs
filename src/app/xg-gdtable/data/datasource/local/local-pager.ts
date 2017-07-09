import {Row} from '../../data-set/index'

export class LocalPager {
    static paginate(data: Array<Row>, page: number, perPage: number): Array<Row> {
        return data.slice((page - 1) * perPage, page * perPage);
    }
}