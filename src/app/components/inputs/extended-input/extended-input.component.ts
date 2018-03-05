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
  @Input()
  message:string = '';

  displayMessage:string = '';
  displayClass:string = '';
  labelCssClass:string = '';

  constructor(){
  }

  ngOnChanges(changes:any):void {
    this.displayMessage = '';
    if(changes.inputErrors && changes.inputErrors.currentValue){
      var errors:any = changes.inputErrors.currentValue;
      this.displayClass = 'defaultError';
      if (errors) {
        Object.keys(this.errorKeys).some(key => {
          if (errors[key]) {
            this.displayMessage = this.errorKeys[key];
            return true;
          }
        });
      }
    }
    else if(changes.message){
      this.displayMessage = this.message;
      this.displayClass = 'message';
    }
  };

  ngOnInit(){
    this.labelCssClass = this.labelCss || 'globalLabel';
    this.displayMessage = '';
    this.displayClass = 'defaultError';
  }
}
