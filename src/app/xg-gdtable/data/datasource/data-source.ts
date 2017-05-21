import { Observable, Subject } from 'rxjs/rx'

export abstract class DataSource {

    protected onChangedSource = new Subject<any>();
    protected onAddedSource = new Subject<any>();
    protected onRemovedSource = new Subject<any>();
    protected onUpdatedSource = new Subject<any>();

    abstract getAll(): Promise<any>;
    abstract getElements(): Promise<any>;
    abstract getSort(): any;
    abstract getFilter(): any;
    abstract getPaging(): any;
    abstract count(): number;

    onChanged(): Observable<any> {
        return this.onChangedSource.asObservable();
    }
    onAdded(): Observable<any> {
        return this.onAddedSource.asObservable();
    }
    onRemoved(): Observable<any> {
        return this.onRemovedSource.asObservable();
    }
    onUpdated(): Observable<any> {
        return this.onUpdatedSource.asObservable();
    }

    refresh(): void {
        this.emitOnChanged('refresh');
    }

    load(data: Array<any>): Promise<any> {
        this.emitOnChanged('load');
        return Promise.resolve();
    }

    prepend(element: any): Promise<any> {
        this.emitOnAdded(element);
        this.emitOnChanged('prepend');
        return Promise.resolve();
    }
    append(element: any): Promise<any> {
        this.emitOnAdded(element);
        this.emitOnChanged('append');
        return Promise.resolve();
    }
    add(element: any): Promise<any> {
        this.emitOnAdded(element);
        this.emitOnChanged('add');
        return Promise.resolve();
    }
    remove(element: any): Promise<any> {
        this.emitOnRemoved(element);
        this.emitOnChanged('remove');
        return Promise.resolve('remove');
    }

    update(element: any, value: any): Promise<any> {
        this.emitOnUpdated(element);
        this.emitOnChanged('update');
        return Promise.resolve();
    }
    empty(): Promise<any> {
        this.emitOnChanged('empty');
        return Promise.resolve();
    }

    setSort(conf: Array<any>, doEmit?: boolean): void {
        if (doEmit) {
            this.emitOnChanged('sort');
        }
    }
    setFilter(filterConf: any, andOperator: boolean = true, doEmit?: boolean) {
        if (doEmit) {
            this.emitOnChanged('filter');
        }
    }
    addFilter(filterConf: any, andOperator: boolean, doEmit?: boolean) {
        if (doEmit) {
            this.emitOnChanged('filter');
        }
    }

    setPage(page: number, doEmit?: boolean) {
        if (doEmit) {
            this.emitOnChanged('page');
        }
    }

    setPaging(page: number, perPage: number, doEmit?: boolean) {
        if (doEmit) {
            this.emitOnChanged('paging');
        }
    }
    protected emitOnAdded(element: any): void {
        this.onAddedSource.next(element);
    }
    protected emitOnUpdated(element: any): void {
        this.onUpdatedSource.next(element);
    }
    protected emitOnRemoved(element: any): void {
        this.onRemovedSource.next(element);
    }
    protected emitOnChanged(action: string): void {
        this.getElements().then((elements) => this.onChangedSource.next({
            action: action,
            elements: elements,
            filter: this.getFilter(),
            paging: this.getPaging(),
            sort: this.getSort()
        }))
    }

}
