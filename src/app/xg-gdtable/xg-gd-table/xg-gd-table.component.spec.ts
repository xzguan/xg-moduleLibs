import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { XgGdTableComponent } from './xg-gd-table.component';

import {Cell,Column,Row,DataSet} from '../data/data-set/index';
import {LocalDataSource} from '../data/datasource/local/local-data-source';
import {DataSource} from '../data/datasource/data-source';
import { Grid } from '../data/grid/grid';

import {TitleComponent} from '../title/title.component';
import {FilterComponent} from '../filter/filter.component';
import {PagerComponent} from '../pager/pager.component';
import {CellComponent} from '../cell/cell.component';

import { deepExtend } from '../../infrastructure/helper'




describe('XgGdTableComponent', () => {
  let component: XgGdTableComponent;
  let fixture: ComponentFixture<XgGdTableComponent>;
  let data= [
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
    let settings = {
        columns: {
            id: {
                title: 'ID',
                sort:true
            },
            name: {
                title: 'Full Name'
            },
            username: {
                title: 'User Name',
            },
            link: {
                title: 'Link',
                type: 'html',
                editor: {
                    type: 'custom',
                    component: ''
                }
            }
        }
    };
    let source:DataSource=new LocalDataSource(data);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
          FormsModule
          ],
      declarations: [ 
        XgGdTableComponent,
        FilterComponent,
        TitleComponent,
        PagerComponent,
        CellComponent,
       ],
       schemas:[
            CUSTOM_ELEMENTS_SCHEMA
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgGdTableComponent);
    component = fixture.componentInstance;
    component.source=source;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
