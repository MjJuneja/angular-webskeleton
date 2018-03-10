import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ipassword',
  templateUrl: './ipassword.component.html',
  styleUrls: ['./ipassword.component.css']
})
export class IpasswordComponent implements OnInit {

  @Input()
  dual: boolean;

  $password: FormControl;
  _password: string;
  $password2: FormControl;
  _password2: string;
  message: string = '';
  @Output() userUpdated = new EventEmitter<Object>();
  constructor() {
  }

  checkPristine = (control: FormControl): object => {
    this.message = '';
    if (control.pristine){
      var obj = {form:this.$password2,name:'password'};
      this.userUpdated.emit(obj);
      return { pristine: true };
    }
    else{
      var obj = {form:this.$password2,name:'password'};
      this.userUpdated.emit(obj);
      return null;
    }
  }

  match = (control: FormControl): object => {
    if (this._password && this._password === this._password2){
      var obj = {form:this.$password2,name:'password'};
      this.userUpdated.emit(obj);
      this.message = 'Passwords Match';
      return null;
    }
    else
    {
      var obj = {form:this.$password2,name:'password'};
      this.userUpdated.emit(obj);
      return { mismatch: true };
    }
      
  }

  passwordPattern = (control: FormControl): object => {
    var x = Validators.pattern('[a-z0-9A-Z!@#$%^&*()_.]{8,25}')(control);
    if (x) {
      var obj = {form:this.$password2,name:'password'};
      this.userUpdated.emit(obj);
      return { passwordPattern: true }
    }
    else {
      var obj = {form:this.$password2,name:'password'};
      this.userUpdated.emit(obj);
      return x;
    }
  }

  ngOnInit() {
    
    var createMode = this.dual || false;
    if(createMode){
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
    }
    else{
      this.$password = new FormControl(null,
        {
          validators: [Validators.required, this.passwordPattern, this.checkPristine],
          updateOn: 'blur'
        });
    }
    //  var obj = {form:this.$password,name:'password'};
    //   this.userUpdated.emit(obj);
  }
}
