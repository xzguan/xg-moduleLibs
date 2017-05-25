import { Component,ViewChild,ElementRef } from '@angular/core';
import {LocalDataSource,DataSource,XG_TABLE_EDIT_COMPONENTS,DefaultEditor} from './xg-gdtable/xg-gdtable.module' 
import {CustomUrlEditorComponent} from './xg-gdtable/cell/custom-editors/custom-url-editor.component'



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
                    component: CustomUrlEditorComponent
                }
            }
        },
        pager:{
            perPage:2
        }
        
    };
    source:DataSource=new LocalDataSource(this.data);
}

