import {Http} from '@angular/http';
import { Component,ViewChild,ElementRef } from '@angular/core';
import {LocalDataSource,DataSource,CELL_PROCESS_COMPONET} from './xg-gdtable/xg-gdtable.module' 
import {CustomUrlEditorComponent} from './xg-gdtable/cell/custom-editors/custom-url-editor.component'
import {CustomCheckboxgroupEditorComponent} from './xg-gdtable/cell/custom-editors/custom-checkgroup-editor.component'

import { Injectable } from '@angular/core';

/*@Injectable()
export class CustomServerDataSource extends LocalDataSource {

  lastRequestCount: number = 0;

  constructor(protected http: Http) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    let url = 'https://jsonplaceholder.typicode.com/photos?';

    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        
        url += `_sort=${fieldConf.field}&_order=${fieldConf.direction.toUpperCase()}&`;
      });
    }

    if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
      url += `_page=${this.pagingConf['page']}&_limit=${this.pagingConf['perPage']}&`;
    }

    if (this.filterConf.filters) {
      this.filterConf.filters.forEach((fieldConf) => {
        if (fieldConf['search']) {
          url += `${fieldConf['field']}_like=${fieldConf['search']}&`;
        }
      });
    }

    return this.http.get(url).map(res => {
      this.lastRequestCount = +res.headers.get('x-total-count');
      return res.json();
    }).toPromise();
  }
}*/


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
            username: "<h1>Bret</h1>",
            gender:'male',
            link: "<a href='http://www.google.com'>Google</a>",
            roles:[{key:'admin',value:true},{key:'backup',value:false},{key:'manager',value:true}]
        },
        {
            id: 2,
            name: "Ervin Howell",
            username: "Antonette",
            gender:true,
            link: "<a href='https://github.com/akveo/ng2-admin'>Ng2 Admin</a>",
            roles:[{key:'admin',value:true},{key:'backup',value:false},{key:'manager',value:false}]
        },
        {
            id: 3,
            name: "Clementine Bauch",
            username: "Samantha",
            gender:true,
            link: "<a href='https://github.com/akveo/ng2-smart-table'>Ng2 smart table</a>",
            roles:[{key:'admin',value:false},{key:'backup',value:true},{key:'manager',value:false}]
        },
        {
            id: 4,
            name: "Patricia Lebsack",
            username: "Karianne",
            gender:'female',
            link: "<a href='https://github.com/akveo/blur-admin'>Blur Admin</a>",
            roles:[{key:'admin',value:false},{key:'backup',value:true},{key:'manager',value:false}]
        },
        
    ];
    settings = {
        attr:{
          id:1,
          class:'table'
        },
        add:{
          confirmCreate:true
        },
        columns: {
            id: {
                title: 'ID',
                sort:true,
                type:'html',
                isEditable:false,
                valuePrepareFunction: (x)=>{return x+100;}

            },
            name: {
                title: 'Full Name',
                filter:true,
                valuePrepareFunction: (x)=>{return x+1000;}

            },
            username: {
                title: 'User Name',
                type:'html',
                sort:true,
                filter:true
            },
            link: {
                title: 'Link',
                type: 'html',
                editor: {
                    type: 'custom',
                    component: CustomUrlEditorComponent
                },
                cellRenderFunction:(x,inst)=>{inst.innerHTML='Hello World'}
                
            },
            gender:{
              title:'gender',
              editor:{
                type:'checkbox',
                config:{
                  list:[{value:'Select One',title:'Select One'}, {value:'male',title:'Male'},{value:'female',title:'Female'}],
                  true:true
                }
              }
            },
            roles:{
              title:'Roles',
              editor:{
                type:'custom',
                component:CustomCheckboxgroupEditorComponent,
                config:{
                  list:[{key:'admin',value:false},{key:'backup',value:false},{key:'manager',value:false}]
                }
              },
              defaultValue:[{key:'admin',value:false},{key:'backup',value:false},{key:'manager',value:false}],
              cellRenderFunction: (cell,inst)=>{
                 if(Array.isArray(cell.getValue())){
                     var filterArr=cell.getValue().filter((el)=>{return el.value;})
                     var result='';
                     filterArr.forEach((el)=>{
                       if(el.value){
                         result=result +((result==='')?'':';')+ el.key
                       }
                     })
                     if(result){
                        inst.innerHTML=`Roles: ${result}`;
                        return;
                     }
                     
                 }
                 inst.innerHTML= 'No Roles'
                 
              }
            }

        },
        pager:{
            perPage:2
        }
        
    };
    source:DataSource=new LocalDataSource(this.data);
    onCreateConfirm(event){
      if(window.confirm("Do you comfirm to create a new record?")){
        event.confirm.resolve(event.newData);
      }else{
        event.confirm.reject();
      }
    }
}
/*@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  settings = {
    attr:{
      class:'table table-striped'
    },
    columns: {
      id: {
        title: 'ID'
      },
      albumId: {
        title: 'Album',
     
      },
      title: {
        title: 'Title',
        sort:true
      },
      url: {
        title: 'Url',
        filter:true
      }
    }
  };

  source: CustomServerDataSource;
  person:string="Eric";

  constructor(http: Http) {
    this.source = new CustomServerDataSource(http);
  }
  onRowSelect(){
   
  }
}*/


