import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'iemail',
  templateUrl: './iemail.component.html',
  styleUrls: ['./iemail.component.css']
})
export class IemailComponent implements OnInit {
  vEmail: FormControl;
  uEmail: string;

  constructor() {
    this.vEmail = new FormControl(null, { validators: [Validators.required, Validators.email, this.checkEmail, this.checkPristine], updateOn: 'blur' });
  }

  checkPristine = (control: FormControl):object => {
    return { pristine: control.pristine };
  }

  checkEmail = (control: FormControl):object => {
    if (control.value) {
      var atpos = control.value.indexOf("@");
      var dotpos = control.value.lastIndexOf(".");
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= control.value.length) {
        return { validEmail: true }
      }
    }
    return { validEmail: false }
  }

  ngOnInit() {

  }
}
