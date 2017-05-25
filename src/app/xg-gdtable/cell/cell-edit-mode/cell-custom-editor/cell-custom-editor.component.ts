import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  SimpleChanges,
  OnChanges,
  OnDestroy } from '@angular/core';

import { CellCommonEditor } from '../cell-common-editor';
/*import { Cell } from '../../../data/data-set/cell';*/

@Component({
  selector: 'cell-custom-editor',
  template: `
    <ng-template #dynamicTarget></ng-template>
  `,
})
export class CellCustomEditorComponent extends CellCommonEditor implements OnChanges {

  customComponent: any;
  @ViewChild('dynamicTarget', {read: ViewContainerRef}) dynamicTarget: any;

  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cell && !this.customComponent){
      let componentFactory = this.resolver.resolveComponentFactory(this.cell.getColumn().editor.component);
      this.customComponent = this.dynamicTarget.createComponent(componentFactory);

      // set @Inputs and @Outputs of custom component
      this.customComponent.instance.cell = this.cell;
      this.customComponent.instance.inputClass = this.inputClass;
      this.customComponent.instance.onStopEditing.subscribe(() => this.onStopEditing());
      this.customComponent.instance.onEdited.subscribe((event) => this.onEdited(event));
      this.customComponent.instance.onClick.subscribe((event) => this.onClick(event));
    }
  }

  ngOnDestroy(): void {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
  }
}