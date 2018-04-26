import { AdvanceinputService } from './advanceinput.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'advanceInput',
  templateUrl: './advanceinput.component.html',
  styleUrls: ['./advanceinput.component.scss'],
  providers: [AdvanceinputService]
})
export class AdvanceinputComponent implements OnInit {

  @Input()
  type: string = '';
  message: string = '';

  $email: FormControl;
  _email: string;

  $username: FormControl;
  _username: string;

  $password: FormControl;
  _password: string;
  $password2: FormControl;
  _password2: string;
  createMode: boolean;

  constructor(private advanceInput: AdvanceinputService) {

  }

  checkPristine = (control: FormControl): object => {
    this.message = '';
    if (control.pristine)
      return { pristine: true };
    else
      return null;
  }


  checkEmail = (control: FormControl): object => {
    if (control.value) {
      var atpos = control.value.indexOf("@");
      var dotpos = control.value.lastIndexOf(".");
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= control.value.length) {
        return { invalidEmail: true }
      }
    }
    return null;
  }

  match = (control: FormControl): object => {
    if (this._password && this._password === this._password2) {
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

  checkAvailability = (control: FormControl): any => {
    const q = new Promise((resolve, reject) => {
      this.advanceInput.callServer({ username: control.value }).subscribe(() => {
        //logic
        if (true) {
          this.message = "Username available";
          resolve(null);
        }
        // else {
        //   resolve({ 'unavailable': true });
        // }
      }, () => {
        resolve({ '503': true });
      })
    })
    return q;
  }


  ngOnInit() {
    switch (this.type) {
      case 'email':
        this.$email = new FormControl(null, { validators: [Validators.required, Validators.email, this.checkEmail, this.checkPristine], updateOn: 'blur' });
        break;
      case 'username':
        this.$username = new FormControl(null,
          {
            validators: [Validators.required, Validators.pattern('[a-zA-Z0-9_.]{5,20}'), this.checkPristine],
            asyncValidators: [this.checkAvailability.bind(this)],
            updateOn: 'change'
          });
        break;
      case 'password':
        this.$password = new FormControl(null,
          {
            validators: [Validators.required, this.passwordPattern, this.checkPristine],
            updateOn: 'blur'
          });
        break;
      case 'password2':
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
        break;
      default: console.log('Error:No input type specified!');
    }

  }

}
