import { Component,ViewChild,ElementRef,Input } from '@angular/core';
import { Cell } from '../../data/data-set/index';
import { DefaultEditor ,Editor} from '../editors/index';


@Component({
    selector: 'custom-url-editor',
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
})
export class CustomUrlEditorComponent extends DefaultEditor {

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

