import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';

import { XgGdTableComponent } from './xg-gd-table/xg-gd-table.component';


import { TitleComponent } from './title/title.component';
import { FilterComponent } from './filter/filter.component';
import { PagerComponent } from './pager/pager.component';
import { CellComponent } from './cell/cell.component';

 const XG_TABLE_PARTS_COMPONENTS=[
  TitleComponent,
  FilterComponent,
  PagerComponent,
  CellComponent,
] 


import {Custom_XX_Editor_Components} from './cell/custom-editors/index';

import {CELL_PROCESS_COMPONET} from './cell/index';

import {Ng2CompleterModule} from 'ng2-completer';


export * from './data/data-set/index';
export * from './data/datasource/index';


export   {XgGdTableComponent,CELL_PROCESS_COMPONET};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2CompleterModule

  ],
  declarations: [
     XgGdTableComponent,
     XG_TABLE_PARTS_COMPONENTS,
     CELL_PROCESS_COMPONET
     ],
  
  exports:[XgGdTableComponent,...CELL_PROCESS_COMPONET],
  entryComponents:[...Custom_XX_Editor_Components]
  
})
export class XgGdtableModule { }
