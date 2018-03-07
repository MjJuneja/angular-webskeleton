import { AdvanceinputService } from './advanceinput.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'advanceInput',
  templateUrl: './advanceinput.component.html',
  styleUrls: ['./advanceinput.component.css'],
  providers: [AdvanceinputService]
})
export class AdvanceinputComponent implements OnInit {

  @Input()
  type: string = '';
  message: string = '';

  vEmail: FormControl;
  uEmail: string;

  vUsername: FormControl;
  uUsername: string;

  @Input()
  dual: boolean;
  vPassword: FormControl;
  uPassword: string;
  vPassword2: FormControl;
  uPassword2: string;
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
    if (this.uPassword && this.uPassword === this.uPassword2){
      this.message = 'Passwords Match';
      return null;
    }
    else
      return { mismatch: true };
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
        this.vEmail = new FormControl(null, { validators: [Validators.required, Validators.email, this.checkEmail, this.checkPristine], updateOn: 'blur' });
        break;
      case 'username':
        this.vUsername = new FormControl(null,
          {
            validators: [Validators.required, Validators.pattern('[a-zA-Z0-9_.]{5,20}'), this.checkPristine],
            asyncValidators: [this.checkAvailability.bind(this)],
            updateOn: 'blur'
          });
        break;
      case 'password':
        this.vPassword = new FormControl(null,
          {
            validators: [Validators.required, Validators.pattern('[a-z0-9A-Z!@#$%^&*()_.]{8,25}'), Validators.minLength(8), Validators.maxLength(25), this.checkPristine, this.match],
            updateOn: 'blur'
          });
        this.createMode = this.dual || false;
        if (this.createMode) {
          this.vPassword2 = new FormControl(null,
            {
              validators: [Validators.required, this.checkPristine, this.match],
              updateOn: 'blur'
            });
        }
        break;
      default: console.log('Error:No input type specified!');
    }

  }

}
