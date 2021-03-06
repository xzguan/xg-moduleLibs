import { TestBed, async,ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {XgGdtableModule,DataSource,LocalDataSource,XgGdTableComponent,XG_TABLE_CELL_COMPONENTS} from './xg-gdtable/xg-gdtable.module';
import {FormsModule} from '@angular/forms';

import {Ng2CompleterModule} from 'ng2-completer';

/*import {XG_TABLE_CELL_COMPONENTS} from './xg-gdtable/cell/editors/index'
import {TitleComponent} from './xg-gdtable/title/title.component';
import {PagerComponent} from './xg-gdtable/pager/pager.component';
import {FilterComponent} from './xg-gdtable/filter/filter.component';
import {CellComponent} from './xg-gdtable/cell/cell.component' 

import { CellEditModeComponent } from './xg-gdtable/cell/cell-edit-mode/cell-edit-mode.component';
import { CellViewModeComponent } from './xg-gdtable/cell/cell-view-mode/cell-view-mode.component';
import {CustomUrlEditorComponent} from './xg-gdtable/cell/custom-editors/custom-url-editor.component';
import {DefaultEditorComponent} from './xg-gdtable/cell/cell-edit-mode/cell-default-editor.component'*/

describe('AppComponent', () => {
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
        FormsModule,
        Ng2CompleterModule,
        XgGdtableModule
        ],
      declarations: [
        AppComponent, 
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgGdTableComponent);
    component = fixture.componentInstance;
    component.source=source;
    component.settings=settings;
    fixture.detectChanges();
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
