export class LocalSorter {
    protected  static COMPARE = (dir: number, a: any, b:any) => {
        if (a < b) {
            return -1 * dir;
        }                         
        if (a > b) {
            return dir;   
        }           
        
        return 0;
    }
     static sort(data: Array<any>, field: string, direction: string, customCompare?: Function): Array<any> {

        let dir = (direction.toUpperCase() === 'ASC') ? 1 : -1;
        let compare = customCompare ? customCompare : this.COMPARE;
        

        return  data.sort((a, b) => {
            return compare.call(null, dir, a[field], b[field]);
        })

    }
}