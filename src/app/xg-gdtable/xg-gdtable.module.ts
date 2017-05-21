import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';

import { XgGdTableComponent } from './xg-gd-table/xg-gd-table.component';

import { TitleComponent } from './title/title.component';
import { FilterComponent } from './filter/filter.component';
import { PagerComponent } from './pager/pager.component';
import { CellComponent } from './cell/cell.component';
import { CellEditModeComponent } from './cell/cell-edit-mode/cell-edit-mode.component';
import { CellViewModeComponent } from './cell/cell-view-mode/cell-view-mode.component';

import {DefaultEditorComponent} from './cell/cell-edit-mode/cell-default-editor.component'


import {XG_TABLE_CELL_COMPONENTS} from './cell/editors/index';
export * from './cell/editors/index';
import {CustomUrlEditorComponent} from './cell/custom-editors/custom-url-editor.component';


import {Ng2CompleterModule} from 'ng2-completer';


export * from './data/data-set/index';
export * from './data/datasource/local/local-data-source';
export * from './data/datasource/data-source';

 

 const XG_TABLE_PARTS_COMPONENTS=[
  TitleComponent,
  FilterComponent,
  PagerComponent,
  CellComponent,
] 
const XG_TABLE_EDIT_COMPONENTS=[
  CellEditModeComponent,
  CellViewModeComponent,
  DefaultEditorComponent,
  CustomUrlEditorComponent
]
export   {XgGdTableComponent,XG_TABLE_CELL_COMPONENTS,XG_TABLE_EDIT_COMPONENTS,XG_TABLE_PARTS_COMPONENTS};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2CompleterModule

  ],
  declarations: [
     XgGdTableComponent,
     ...XG_TABLE_PARTS_COMPONENTS,
     ...XG_TABLE_EDIT_COMPONENTS,
      ...XG_TABLE_CELL_COMPONENTS],
  
  exports:[XgGdTableComponent,...XG_TABLE_CELL_COMPONENTS,...XG_TABLE_EDIT_COMPONENTS,...XG_TABLE_PARTS_COMPONENTS]
})
export class XgGdtableModule { }
