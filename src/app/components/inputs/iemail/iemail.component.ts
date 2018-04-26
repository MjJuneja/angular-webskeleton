import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'iemail',
  templateUrl: './iemail.component.html',
  styleUrls: ['./iemail.component.scss']
})
export class IemailComponent implements OnInit {
  $email: FormControl;
  _email: string;

  constructor() {
    this.$email = new FormControl(null, { validators: [Validators.required, Validators.email, this.checkEmail, this.checkPristine], updateOn: 'blur' });
  }

  checkPristine = (control: FormControl): object => {
    if (control.pristine)
      return { pristine: true };
    else
      return null;
  }

  checkEmail = (control: FormControl):object => {
    if (control.value) {
      var atpos = control.value.indexOf("@");
      var dotpos = control.value.lastIndexOf(".");
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= control.value.length) {
        return { invalidEmail: true }
      }
    }
    return null;
  }

  ngOnInit() {

  }
}
