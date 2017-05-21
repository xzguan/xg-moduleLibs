import { Component,ViewChild,ElementRef } from '@angular/core';
import {LocalDataSource,DataSource,XG_TABLE_EDIT_COMPONENTS,DefaultEditor} from './xg-gdtable/xg-gdtable.module' 

@Component({
 
    selector: 'custom-editor',
    
    template: `
    Name: <input [ngClass]="inputClass"
            #name
            class="form-control short-input"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            [placeholder]="cell.getTitle()"
            (click)="onClick.emit($event)"
            (keyup)="updateValue()"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()"><br>
    Url: <input [ngClass]="inputClass"
            #url
            class="form-control short-input"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            [placeholder]="cell.getTitle()"
            (click)="onClick.emit($event)"
            (keyup)="updateValue()"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">
    <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
    ` 

    //template:`Hello World`
    
})
class CustomEditorComponent extends DefaultEditor {

  
    @ViewChild('name') name: ElementRef;
    @ViewChild('url') url: ElementRef;
    @ViewChild('htmlValue') htmlValue: ElementRef;

    constructor() {
        
        super();
        

    }

    ngAfterViewInit(): void {
        if (!this.cell) return;
        if (this.cell.newValue !== '') {
            this.name.nativeElement.value = this.getUrlName();
            this.url.nativeElement.value = this.getUrlHref();
        }
    }

    updateValue(): void {
        const href = this.url.nativeElement.value;
        const name = this.name.nativeElement.value;
        this.cell.newValue = `<a href='${href}'>${name}</a>`;
    }

    getUrlName(): string {
        return this.htmlValue.nativeElement.innerText;
    }

    getUrlHref(): string {
        return this.htmlValue.nativeElement.querySelector('a').getAttribute('href');
    }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
   data= [
        {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            link: "<a href='http://www.google.com'>Google</a>"
        },
        {
            id: 2,
            name: "Ervin Howell",
            username: "Antonette",
            link: "<a href='https://github.com/akveo/ng2-admin'>Ng2 Admin</a>"
        },
        {
            id: 3,
            name: "Clementine Bauch",
            username: "Samantha",
            link: "<a href='https://github.com/akveo/ng2-smart-table'>Ng2 smart table</a>"
        },
        {
            id: 4,
            name: "Patricia Lebsack",
            username: "Karianne",
            link: "<a href='https://github.com/akveo/blur-admin'>Blur Admin</a>"
        },
    ];
    settings = {
        columns: {
            id: {
                title: 'ID',
                sort:true,
                isEditable:false
            },
            name: {
                title: 'Full Name',
                filter:true
            },
            username: {
                title: 'User Name',
                sort:true,
                filter:true
            },
            link: {
                title: 'Link',
                type: 'html',
                editor: {
                    type: 'custom',
                    component: CustomEditorComponent
                }
            }
        },
        pager:{
            perPage:2
        }
        
    };
    source:DataSource=new LocalDataSource(this.data);
}

