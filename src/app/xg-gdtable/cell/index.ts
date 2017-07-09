import {CellCustomEditorComponent} from './cell-edit-mode/cell-custom-editor/cell-custom-editor.component';
import {Custom_XX_Editor_Components} from './custom-editors/index';

import {CellDefaultEditorComponent} from './cell-edit-mode/cell-default-editor/cell-default-editor.component';
import {DEFAULT_XX_EDITOR_COMPONENTS} from './editors/index';


import {CellViewModeComponent} from './cell-view-mode/cell-view-mode.component';
import {CellEditModeComponent}  from './cell-edit-mode/cell-edit-mode.component';

import {CellComponent} from './cell.component';


export const CELL_PROCESS_COMPONET=[
    CellViewModeComponent,
    CellEditModeComponent,
    CellCustomEditorComponent,
    Custom_XX_Editor_Components,
    CellDefaultEditorComponent,
    DEFAULT_XX_EDITOR_COMPONENTS,
    CellComponent
]