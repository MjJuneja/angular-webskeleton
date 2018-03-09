import { loginFormService } from './login.service';
import { AdvanceinputComponent } from './../../inputs/advanceinput/advanceinput.component';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'loginForm',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [loginFormService]
})
export class LoginComponent implements OnInit {

  @ViewChildren(AdvanceinputComponent)
  fields: QueryList<AdvanceinputComponent>
  formValues: object = {};
  status = [];
  result: string = '';

  constructor(private loginService: loginFormService) {
  }


  onSubmit() {
    this.status = [];
    this.fields.forEach(item => {
      this.status.push(item['$' + item.type].status);
      this.formValues[item.type] = item['$' + item.type].value;
    });
    if (this.status.indexOf('INVALID') !== -1) {
      this.result = 'Please fill correct data!';
    }
    else if (this.fields.last.$password.value !== this.fields.last.$password2.value) {
      this.result = "Passwords don't match! Enter password carefully.";
    }
    else if (this.status.indexOf('PENDING') !== -1) {
      this.result = 'Wait for username availability check to finish!'
    }
    else {
      this.result = "Signing up..";
      this.login();
    }
    console.log(this.status, this.formValues);
  }

  login = (): void => {
    this.formValues["roleId"] = 'customer';
    this.loginService.login(this.formValues).subscribe((data) => {
      console.log(data);
      //logic
      this.result = "Successfully logged in!";
    }, (error) => {
      this.result = "Error occurred! Try again later.";
    })
  }

  ngOnInit(): void {
  }

}
