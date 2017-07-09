import { Component, OnInit,Input,OnChanges,SimpleChange } from '@angular/core';

@Component({
  selector: 'hook-test',
  templateUrl: './hook-test.component.html',
  styleUrls: ['./hook-test.component.css']
})
export class HookTestComponent implements OnInit, OnChanges {

  @Input() name :string
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes:{[propertyName:string]:SimpleChange}){
    for(let propName in changes){
      console.log(changes[propName].currentValue)
    }
    
  }

}
