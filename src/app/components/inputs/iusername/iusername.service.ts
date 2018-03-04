import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class IusernameService{
  constructor(private httpClient:HttpClient){
  }

  checkAvailability(obj:object):object{
    let url='http://ec2-35-165-36-171.us-west-2.compute.amazonaws.com:8080'+'/commonroutes/checkUsername';
    return this.httpClient.post<object>(url,obj);
  }
}
