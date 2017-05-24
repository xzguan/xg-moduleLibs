import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellViewModeComponent } from './cell-view-mode.component';
import {Cell,Column,Row,DataSet} from '../../data/data-set/index';

describe('CellViewModeComponent', () => {
  let component: CellViewModeComponent;
  let fixture: ComponentFixture<CellViewModeComponent>;
  let data:Array<any>=[
    {id:1,email:'eric@huida.com',roles:[{admin:true},{backup:true}]},
    {id:2,email:'johny@huida.com',roles:[{admin:false},{backup:false}]}
  ];
  let columnSetting:object={
    id:{
        title:'ID',
        type:'string',
        isEditable:'false'
      },
    email:{
      title:'Email',
      type:'string',
      isEditable:'false',
      isSortable:'true',
    },
    roles:{
      titel:'Roles',
      type:'Array<any>'
    }  
  }
  let dataSet=new DataSet(data,columnSetting);

  let column=new Column('0',columnSetting['email'])
  let row=new Row(0,data[0],dataSet);
  let cell:Cell=new Cell(data[0]['email'],column,row);

 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellViewModeComponent ],
   
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellViewModeComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    component.cell=cell;

    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('TestTest',()=>{
  it("expect Test",()=>{
    expect(4*4).toEqual(16);
  })
  
})
