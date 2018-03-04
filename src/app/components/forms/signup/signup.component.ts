import { Component, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'signupForm',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  someNumber:AbstractControl;

  constructor() {
  }


  onSubmit(){
    //Some submit logic
  }

  ngOnInit():void {

  }


}
