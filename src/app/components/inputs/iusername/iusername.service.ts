import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class IusernameService {
  constructor(private httpClient: HttpClient) {
  }

  checkAvailability(obj: object):any {
    let url = environment.apiUrl + environment.checkUsername;
    return this.httpClient.post<object>(url, obj);
  }
}
