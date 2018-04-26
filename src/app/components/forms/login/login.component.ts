import { IpasswordComponent } from './../../inputs/ipassword/ipassword.component';
import { IemailComponent } from './../../inputs/iemail/iemail.component';
import { loginFormService } from './login.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'loginForm',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [loginFormService]
})
export class LoginComponent implements OnInit {

  formValues: object = {};
  status = [];
  result: string = '';
  fields = {};

  @ViewChildren(IemailComponent)
  iEmails: QueryList<IemailComponent>
  @ViewChild(IpasswordComponent)
  iPassword: IpasswordComponent


  constructor(private loginService: loginFormService) {
  }


  onSubmit() {
    this.status = [];
    Object.keys(this.fields).forEach(item => {
      this.status.push(this.fields[item]["$" + item].status);
      this.formValues[item] = this.fields[item]["$" + item].value;
    });
    if (this.status.indexOf('INVALID') !== -1) {
      this.result = 'Please fill correct data!';
    }
    else {
      this.result = "Logging up..";
      this.login();
    }
    console.log(this.status, this.formValues);
  }

  login = (): void => {
    this.formValues["roleId"] = 'customer';
    this.loginService.login(this.formValues).subscribe((data) => {
      console.log(data);
      //logic
      this.result = "Successfully logged in..";
    }, (error) => {
      this.result = "Error occurred! Try again later.";
    })
  }

  ngOnInit(): void {
    console.log(this.iEmails);
    // this.fields["email"] = this.iEmail;
    this.fields["password2"] = this.iPassword;
  }

}
