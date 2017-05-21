import { DataSource} from '../data-source';
import { LocalFilter } from './local-filter';
import { LocalSorter } from './local-sorter';
import { LocalPager } from './local-pager';
import { deepExtend } from '../../../../infrastructure/helper'

export class LocalDataSource extends DataSource {

    protected data: Array<any> = [];
    protected sortConf: Array<any> = [];
    protected filterConf = {
        filters:new Array<any>(),
        andOperator: true
    } 
    protected pagingConf = {};
    protected filteredAndSorted: Array<any> = [];
    
    constructor(data: Array<any> = []) {
        super();
        this.data = data;
    }
    load(data: Array<any>) :Promise<any>{
        this.data = data;
        return super.load(data);
    }

    find(element: any): Promise<any> {
        //let found = this.data[this.data.indexOf(element)];
        let found = this.data.find((el) => el === element);
        if (found) {
            return Promise.resolve(found);
        }
        return Promise.reject(new Error('Element was not found in the dataset'));
    }

    getAll(): Promise<any> {
        let data = this.data.slice(0);
        return Promise.resolve(data);
    }
    getElements(): Promise<any> {
        let data = this.data.slice(0);   
        return Promise.resolve(this.prepareData(data));
    }
    getSort(): any {
        return this.sortConf;
    }
    getFilter(): any {
        return this.filterConf;
    }
    getPaging(): any {
        return this.pagingConf;
    }
    count(): number {
        return this.filteredAndSorted.length;
    }

    update(element: any, values: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.find(element).then((found) => {
                found = deepExtend(found, values);
                super.update(found, values).then(resolve).catch(reject);
            }).catch(reject);
        });
    }
    prepend(element: any): Promise<any> {
        this.reset(true);
        this.data.unshift(element);
        return super.prepend(element);
    }
    append(element: any): Promise<any> {
        this.reset(true);
        this.data.push(element);
        return super.append(element);
    }

    remove(element: any): Promise<any> {
        this.data = this.data.filter(el => el !== element);

        return super.remove(element);
    }
    reset(silent: boolean = false) :void{
        if (silent) {
            this.filterConf = {
                filters: [],
                andOperator: true
            };
            this.sortConf = [];
            this.pagingConf['page'] = 1;
        } else {
            this.setFilter([], true, false);
            this.setSort([], false);
            this.setPage(1);
        }
    }
    empty(): Promise<any> {
        this.data = [];
        return super.empty();
    }
    


    /**
     * Array of conf Objects
     * [
     *  {field:string,direction:asc|desc|null,compare:Function|null}
     * ]
     * @param conf
     * @param doEmit
     * @return LocalDataSource
     */
    setSort(conf: Array<any>, doEmit = true): LocalDataSource {
        if (conf) {
            conf.forEach((fieldConf) => {
                if (!fieldConf ||!fieldConf['field'] || fieldConf['direction'] === undefined) {
                    throw Error('Sort configuration object is not valid ')
                }
            })
        }
        this.sortConf = conf;
        super.setSort(conf, doEmit);
        return this;
    }                                                                                        
    setFilter(conf: Array<any>, andOperator: boolean = true, doEmit: boolean = true): LocalDataSource {
        if (conf && conf.length > 0) {
            conf.forEach((filterConf) => {
                this.addFilter(filterConf, andOperator, false);
            })
        } else {
            this.filterConf = {
                filters: [],
                andOperator:true
            }
        }
        this.filterConf.andOperator = true;
        this.pagingConf['page'] = 1;
        super.setFilter(conf, andOperator, doEmit);
        return this;
    }
    addFilter(fieldConf: any, andOperator: boolean = true, doEmit: boolean = true): LocalDataSource {
        if (!fieldConf || !fieldConf['field'] || fieldConf['search'] === undefined) {
            throw Error('Filter configuration object is not valid')
        }
        let found = false;
        this.filterConf.filters.forEach((currentFilterConf,index) => {
            if (currentFilterConf['field'] === fieldConf['field']) {
                this.filterConf.filters[index] = fieldConf;
                found = true;
            }
        })
        if (!found) {
            this.filterConf.filters.push(fieldConf);
        }
        this.filterConf.andOperator = andOperator;
        super.addFilter(fieldConf,andOperator,doEmit)
        return this;
    }
    setPaging(page: number, perPage: number, doEmit: boolean = true): LocalDataSource {
        this.pagingConf['page'] = page;
        this.pagingConf['perPage'] = perPage;

        super.setPaging(page, perPage, doEmit);
        return this;

    }
    setPage(page: number, doEmit: boolean = true) :LocalDataSource {
        this.pagingConf['page'] = page;
        super.setPage(page, doEmit);
        return this;
    }

   
    protected filter(data: Array<any>): Array<any> {
        if (this.filterConf && this.filterConf.filters) {
            if (this.filterConf.andOperator) {
                this.filterConf.filters.forEach((fieldConf) => {
                    data = LocalFilter
                        .filter(data, fieldConf['field'], fieldConf['search'], fieldConf['filter']);
                })
            } else {
                let mergeData:Array<any> = [];
                this.filterConf.filters.forEach((fieldConf) => {
                    mergeData = mergeData.concat(LocalFilter.filter(data,fieldConf['field'],fieldConf['search'],fieldConf['filter']))
                })
                data = mergeData.filter((el, pos, arr) => {
                    return arr.indexOf(el) === pos;
                })
            }
            
        }
        return data;
    }
    protected sort(data: Array<any>): Array<any>{
        if (this.sortConf) {
            this.sortConf.forEach((fieldConf) => {
                data = LocalSorter.sort(data, fieldConf['field'], fieldConf['direction'], fieldConf['compare']);
            })
        }
        return data;
    }
    protected paginate(data: Array<any>): Array<any> {
        if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
            data = LocalPager.paginate(data, this.pagingConf['page'], this.pagingConf['perPage']);
        }
        return data;
    }
    protected prepareData(data: Array<any>): Array<any> {
        data = this.filter(data);
        data = this.sort(data);

        this.filteredAndSorted = data.slice(0);
        return this.paginate(data);       
    }

    
}