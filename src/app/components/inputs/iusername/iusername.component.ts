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
        asyncValidators: [this.checkAvailability.bind(this)],
        updateOn: 'blur'
      });

  }

  checkPristine = (control: FormControl): object => {
    if (control.pristine)
      return { pristine: true };
    else
      return null;
  }

  checkAvailability = (control: FormControl): any => {
    const q = new Promise((resolve, reject) => {
    this.iusernameService.checkAvailability({username:control.value}).subscribe(() => {
        resolve({ 'available': true });
      }, () => {
        resolve({ '503': true });
      })
    })
    return q;
  }

  ngOnInit() {

  }
}
