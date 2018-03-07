import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AdvanceinputService {
  constructor(private httpClient: HttpClient) {
  }

  callServer(obj: object): any {
    let url = environment.apiUrl + '/commonroutes/checkUsername';
    return this.httpClient.post<object>(url, obj);
  }
}
