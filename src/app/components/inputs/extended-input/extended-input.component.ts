import { Component, Input, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'extended-input',
  templateUrl: './extended-input.component.html',
  styleUrls: ['./extended-input.component.css'],

})


export class ExtendedInputComponent implements OnChanges,OnInit {
  @Input()
  labelText:string = '';
  @Input()
  inputErrors:any;
  @Input()
  errorKeys:any;
  @Input()
  labelCss:string = '';

  errorMessage:string = '';
  labelCssClass:string = '';

  constructor(){
  }

  ngOnChanges(changes:any):void {
    var errors:any = changes.inputErrors.currentValue;
    this.errorMessage = '';
    if (errors) {
      Object.keys(this.errorKeys).some(key => {
        if (errors[key]) {
          this.errorMessage = this.errorKeys[key];
          return true;
        }
      });
    }
  };

  ngOnInit(){
    this.labelCssClass = this.labelCss || 'globalLabel';
    this.errorMessage = '';
  }
}
