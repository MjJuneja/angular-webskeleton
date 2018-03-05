import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ipassword',
  templateUrl: './ipassword.component.html',
  styleUrls: ['./ipassword.component.css']
})
export class IpasswordComponent implements OnInit {

  @Input()
  dual: boolean;

  vPassword: FormControl;
  uPassword: string;
  vPassword2: FormControl;
  uPassword2: string;
  createMode: boolean;
  message: string = '';

  constructor() {
    this.vPassword = new FormControl(null,
      {
        validators: [Validators.required, Validators.pattern('[a-z0-9A-Z!@#$%^&*()_.]{8,25}'), Validators.minLength(8), Validators.maxLength(25), this.checkPristine, this.match],
        updateOn: 'blur'
      });
  }

  checkPristine = (control: FormControl): object => {
    this.message = '';
    if (control.pristine)
      return { pristine: true };
    else
      return null;
  }

  match = (control: FormControl): object => {
    if (this.uPassword && this.uPassword === this.uPassword2){
      this.message = 'Passwords Match';
      return null;
    }
    else
      return { mismatch: true };
  }

  ngOnInit() {
    this.createMode = this.dual || false;
    if(this.createMode){
      this.vPassword2 = new FormControl(null,
        {
          validators: [Validators.required, this.checkPristine, this.match],
          updateOn: 'blur'
        });
    }
  }
}
