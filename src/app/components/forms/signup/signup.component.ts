import { FormControl } from '@angular/forms';
import { signupFormService } from './signup.service';
import { AdvanceinputComponent } from './../../inputs/advanceinput/advanceinput.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'signupForm',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [signupFormService]
})
export class SignupComponent implements OnInit {

  @ViewChildren(AdvanceinputComponent)
  fields:QueryList<AdvanceinputComponent>
  formValues:object={};
  status=[];
  result:string = '';
  form_obj:object={};
  array_try= [];
  constructor(private signupService:signupFormService) {
  }
  

  onSubmit(){
    
    this.status=[];
    var ss = [];
    // Object.keys(this.form_obj).forEach(function(key,index) {
    //   if(key.indexOf('$')>=0){
		//    this.status.push(this.form_obj[key].status);
    //   }
      
     
    // });
    this.array_try.forEach(ele=>{
      this.status.push(ele[ele.name].status);
      this.formValues[ele.name] = ele[ele.name].value;
    });
  //  console.log(this.array_try);
    // this.fields.forEach(item => {
    //   this.status.push(item['$'+item.type].status);
    //   this.formValues[item.type] = item['$'+item.type].value;
    // });
    if(this.status.indexOf('INVALID')!==-1){
      this.result = 'Please fill correct data!';
    }
    else if(this.fields.last.$password.value !== this.fields.last.$password2.value){
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
    // return false;
  }

  signup=():void=>{
    console.log("signup",this.fields);
    this.formValues["roleId"] = 'customer';
    this.signupService.signup(this.formValues).subscribe((data) => {
      console.log(data);
        //logic
        this.result = "Successfully signed up! Logging in..";
      }, (error) => {
        this.result = "Error occurred! Try again later.";
      })
  }

  handleUserUpdated(user){
    switch(user.name){
      case "mail": this.array_try[0] = {"name":user.name,"mail":user.form}; break;
      case "username" : this.array_try[1] = {"name":user.name,"username":user.form}; break;
      case "password" :this.array_try[2] = {"name":user.name,"password":user.form}; break;
    }
     
  }

  ngOnInit():void {
    console.log(this.fields);
  }


}
