import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'iemail',
  templateUrl: './iemail.component.html',
  styleUrls: ['./iemail.component.css']
})
export class IemailComponent implements OnInit {
  $email: FormControl;
  _email: string;
  @Output() userUpdated = new EventEmitter<Object>();
  constructor() {
    this.$email = new FormControl(null, { validators: [Validators.required, Validators.email, this.checkEmail, this.checkPristine], updateOn: 'blur' });
    
 }

  

  checkPristine = (control: FormControl): object => {

    if (control.pristine){
      var obj = {form:this.$email,name:'mail'};
    this.userUpdated.emit(obj); 
      return { pristine: true };
    }
    else{
      var obj = {form:this.$email,name:'mail'};
    this.userUpdated.emit(obj); 
      return null;
    }
  }

  checkEmail = (control: FormControl):object => {
    if (control.value) {
      var atpos = control.value.indexOf("@");
      var dotpos = control.value.lastIndexOf(".");
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= control.value.length) {
        var obj = {form:this.$email,name:'mail'};
        this.userUpdated.emit(obj); 
        return { invalidEmail: true }
      }
    }
    var obj = {form:this.$email,name:'mail'};
    this.userUpdated.emit(obj); 
    return null;
  }

  ngOnInit() {
    // var obj = {form:this.$email,name:'mail'};
    // this.userUpdated.emit(obj); 
  }
}
