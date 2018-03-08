import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class signupFormService {
  constructor(private httpClient: HttpClient) {
  }

  signup(obj: object): any {
    let url = environment.apiUrl + '/commonroutes/checkUsername';
    return this.httpClient.post<object>(url, obj);
  }
}
