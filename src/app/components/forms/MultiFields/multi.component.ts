import { IusernameComponent } from './../../inputs/iusername/iusername.component';
import { IpasswordComponent } from './../../inputs/ipassword/ipassword.component';
import { IemailComponent } from './../../inputs/iemail/iemail.component';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'multiForm',
  templateUrl: './multi.component.html'
})
export class MultiComponent implements OnInit {

  formValues: object = {};
  status = [];
  result: string = '';
  fields = {};

  //Define all inputs below --------------------

  mFields={};

  @ViewChildren(IemailComponent)
  iEmails: QueryList<IemailComponent>
  @ViewChildren(IusernameComponent)
  iUsernames: QueryList<IusernameComponent>
  @ViewChild(IpasswordComponent)
  iPassword: IpasswordComponent

  //For single inputs
  ngOnInit(): void {
    this.fields["password"] = this.iPassword;
  }

  //When using same input multiple times
  defineFields(){
    this.mFields={
      'email':this.iEmails.toArray(),
      'username':this.iUsernames.toArray()
    };
  }

  //--------------------------------------------
  getFields(){
    Object.keys(this.mFields).forEach(item => {
      for(let i=0;i<this.mFields[item].length;i++){
        this.fields[item+i]=this.mFields[item][i];
        this.fields[item+i]["$"+item+i] = this.mFields[item][i]["$"+item];
      }
    });
  }
  //----------------------------------------
  constructor() {
  }

  onSubmit() {
    this.defineFields();
    this.getFields();

    this.status = [];
    Object.keys(this.fields).forEach(item => {
      this.status.push(this.fields[item]["$" + item].status);
      this.formValues[item] = this.fields[item]["$" + item].value;
    });
    if (this.status.indexOf('INVALID') !== -1) {
      this.result = 'Please fill correct data!';
    }
    else {
      this.result = "Logging in..";
      this.login();
    }
    console.log(this.status, this.formValues);
  }

  login = (): void => {
    console.log("success");
    //Custom control
  }


}
