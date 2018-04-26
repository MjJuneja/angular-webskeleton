import { IusernameComponent } from './../../inputs/iusername/iusername.component';
import { IemailComponent } from './../../inputs/iemail/iemail.component';
import { SignupFormService } from './signup.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { IpasswordComponent } from '../../inputs/ipassword/ipassword.component';

@Component({
  selector: 'signupForm',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupFormService]
})
export class SignupComponent implements OnInit {

  formValues:object={};
  status=[];
  result:string = '';
  fields={};

  @ViewChild(IemailComponent)
  iEmail:IemailComponent
  @ViewChild(IusernameComponent)
  iUsername:IusernameComponent
  @ViewChild(IpasswordComponent)
  iPassword:IpasswordComponent

  ngOnInit():void {
    this.fields["email"]=this.iEmail;
    this.fields["username"]=this.iUsername;
    this.fields["password2"]=this.iPassword;
  }


  constructor(private signupService:SignupFormService) {
  }

  fillValues(){
    this.status=[];
    Object.keys(this.fields).forEach(item => {
      this.status.push(this.fields[item]["$"+item].status);
      this.formValues[item] = this.fields[item]["$"+item].value;
    });
  }


  onSubmit(){

    this.fillValues();

    if(this.status.indexOf('INVALID')!==-1){
      this.result = 'Please fill correct data!';
    }
    else if(this.fields["password2"]["$password2"].value !== this.fields["password2"]["$password"].value){
      this.result = "Passwords don't match! Enter password carefully.";
    }
    else if(this.status.indexOf('PENDING')!==-1){
      this.result = 'Wait for username availability check to finish!'
    }
    else{
      this.result = "Signing up..";
      this.signup();
    }
    console.log(this.status,this.formValues);
  }

  signup=():void=>{
    this.formValues["roleId"] = 'customer';
    this.signupService.signup(this.formValues).subscribe((data) => {
      console.log(data);
        //logic
        this.result = "Successfully signed up! Logging in..";
      }, (error) => {
        this.result = "Error occurred! Try again later.";
      })
  }

}

