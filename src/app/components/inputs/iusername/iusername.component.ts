import { IusernameService } from './iusername.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'iusername',
  templateUrl: './iusername.component.html',
  styleUrls: ['./iusername.component.css'],
  providers: [IusernameService]
})
export class IusernameComponent implements OnInit {

  vUsername: FormControl;
  uUsername: string;

  constructor(private iusernameService: IusernameService) {
    this.vUsername = new FormControl(null,
      {
        validators: [Validators.required, Validators.pattern('[a-zA-Z0-9_.]{5,20}'), this.checkPristine],
        asyncValidators: [this.checkAvailability.bind(iusernameService)],
        updateOn:'blur'
      });
  }

  checkPristine = (control: FormControl):object => {
    return { pristine: control.pristine };
  }

  checkAvailability = (control: FormControl):object => {
    console.log('dd');
    this.iusernameService.checkAvailability({username:this.uUsername})
    .subscribe((data) => {

      console.log('hello');

    //   //check object
      return { available: true }
    }),
    (error=>{
      return { '503': true }
    });
    return { checking: true }
  }

  ngOnInit() {

  }
}
