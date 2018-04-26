import { IusernameService } from './iusername.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'iusername',
  templateUrl: './iusername.component.html',
  styleUrls: ['./iusername.component.scss'],
  providers: [IusernameService]
})
export class IusernameComponent implements OnInit {

  $username: FormControl;
  _username: string;
  message: string = '';

  constructor(private iusernameService: IusernameService) {
    this.$username = new FormControl(null,
      {
        validators: [Validators.required, Validators.pattern('[a-zA-Z0-9_.]{5,20}'), this.checkPristine],
        asyncValidators: [this.checkAvailability.bind(this)],
        updateOn: 'change'
      });
  }

  checkPristine = (control: FormControl): object => {
    this.message = '';
    if (control.pristine)
      return { pristine: true };
    else
      return null;
  }

  checkAvailability = (control: FormControl): any => {
    const q = new Promise((resolve, reject) => {
      this.iusernameService.checkAvailability({ username: control.value }).subscribe(() => {
        //logic
        if (true) {
          this.message = "Username available";
          resolve(null);
        }
        // else {
        //   resolve({ 'unavailable': true });
        // }
      }, () => {
        resolve({ '503': true });
      })
    })
    return q;
  }

  ngOnInit() {

  }
}
