import { Component, Input, Output ,EventEmitter,OnInit} from '@angular/core';

import { DataSource } from '../data/datasource/data-source'


@Component({
    moduleId: module.id,
    selector: 'xg-gd-table-pager',
   
    template: `
      <nav *ngIf="shouldShow()" class="xg-gd-table-pagination " >
      <ul class="pagination" >
        <li  [ngClass]="{disabled: getPage() == 1}" >
          <a  href="#" 
          (click)="getPage() == 1 ? false : paginate(1)" aria-label="First">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li [ngClass]="{active: getPage()==page}" *ngFor="let page of getPages()">
            <a *ngIf="getPage()==page" >{{page}}</a>
            <a href="#" (click)="paginate(page)" *ngIf="getPage()!=page">{{page}}</a>
        </li>
  
        <li  
        [ngClass]="{disabled: getPage() == getLast()}">
          <a  href="#" 
          (click)="getPage() == getLast() ? false : paginate(getLast())" aria-label="Last">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>  
    `,
    styleUrls:['pager.component.css']

})




export class PagerComponent implements OnInit {

    @Input() perPage: number;
    @Input() source: DataSource ;
    @Input() showPageCount:number;

    @Output() changePage = new EventEmitter<any>();

    protected pages: Array<any>;
    protected page: number;
    protected count: number;


    ngOnInit(): void {
        
        this.source.onChanged().subscribe((changes :any) => {
            this.page = this.source.getPaging().page;
            this.count = this.source.count();

            this.processPageChange(changes);
            this.initPages();
        })
    } 
    processPageChange(changes: any): void {
        if (changes['action'] === 'prepend') {
            this.source.setPage(1);
        }
        if (changes['action'] === 'append') {
            this.source.setPage(this.getLast());
        }
    }
    getLast(): number {
        return Math.ceil(this.count / this.perPage);
    }
    shouldShow(): boolean {
        return this.count > this.perPage;
    }
    paginate(page: number): boolean {
        this.source.setPage(page);
        this.page = page;
        this.changePage.emit({ page })
        return false;
    }
    getPage(): number {
        return this.page;
    }
    getPages(): Array<any> {
        return this.pages;
    }
    isPageOutOfBounce(): boolean {
        return (this.page * this.perPage) >= (this.count + this.perPage) && this.page > 1;
    }
    initPages() {

        let pagesCount = this.getLast();
        let showPageCount = this.showPageCount? this.showPageCount:5;
        showPageCount = pagesCount > showPageCount ? showPageCount : pagesCount;
        this.pages = [];

        if (showPageCount) {
            let middleOne = Math.ceil(showPageCount / 2);
            middleOne = this.page >= middleOne ? this.page : middleOne;

            let lastOne = middleOne + Math.floor(showPageCount / 2);
            lastOne = lastOne > this.getLast() ? this.getLast() : lastOne;

            let firstOne = lastOne - showPageCount + 1

            for (let i = firstOne; i <= lastOne; i++) {
                this.pages.push(i);
            }

        }
    }
    
}
