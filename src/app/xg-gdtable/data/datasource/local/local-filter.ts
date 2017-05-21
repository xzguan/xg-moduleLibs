
export class LocalFilter {

    protected static FILTER = (value: string, search: string) => {
        return value.toString().toLowerCase().includes(search.toString().toLowerCase());  
    }

    static filter(data: Array<any>, field: string, search: string, customFilter?: Function): Array<any> {
        let filter = customFilter ? customFilter : this.FILTER;

        return data.filter((el) => {
            let value = el === null || el === undefined || el[field] === null || el[field] === undefined ? '' : el[field];
            return filter.call(null,value,search)
        })
    }
}