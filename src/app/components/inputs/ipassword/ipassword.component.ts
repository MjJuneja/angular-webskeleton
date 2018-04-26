import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ipassword',
  templateUrl: './ipassword.component.html',
  styleUrls: ['./ipassword.component.scss']
})
export class IpasswordComponent implements OnInit {

  @Input()
  dual: boolean;

  $password: FormControl;
  _password: string;
  $password2: FormControl;
  _password2: string;
  message: string = '';

  constructor() {
  }

  checkPristine = (control: FormControl): object => {
    this.message = '';
    if (control.pristine)
      return { pristine: true };
    else
      return null;
  }

  match = (control: FormControl): object => {
    if (this._password && this._password === this._password2){
      this.message = 'Passwords Match';
      return null;
    }
    else
      return { mismatch: true };
  }

  passwordPattern = (control: FormControl): object => {
    var x = Validators.pattern('[a-z0-9A-Z!@#$%^&*()_.]{8,25}')(control);
    if (x) {
      return { passwordPattern: true }
    }
    else {
      return x;
    }
  }

  ngOnInit() {
    var createMode = this.dual || false;
    if(createMode){
        this.$password = new FormControl(null,
          {
            validators: [Validators.required, Validators.pattern('[a-z0-9A-Z!@#$%^&*()_.]{8,25}'), Validators.minLength(8), Validators.maxLength(25), this.checkPristine, this.match],
            updateOn: 'blur'
          });
        this.$password2 = new FormControl(null,
          {
            validators: [Validators.required, this.checkPristine, this.match],
            updateOn: 'blur'
          });
    }
    else{
      this.$password = new FormControl(null,
        {
          validators: [Validators.required, this.passwordPattern, this.checkPristine],
          updateOn: 'blur'
        });
    }
  }
}
