import { Injectable }    from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

export class Message
{
  status:string
  message:string
}
@Injectable()
export class UsersService 
{
 
  private isUserLoggedIn;
  private uname=null;

  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { 
    this.isUserLoggedIn = false;
  }

  
  setUserLoggedIn(name:String)
  {
    this.isUserLoggedIn = true;
    alert("nm.."+name);
    this.uname = name;
    alert("unmm..."+this.uname);
  }

  getUserLoggedIn()
  {
    return this.isUserLoggedIn;
  }
  

  addUser(data:any):void
  {
    var Url='http://localhost:1337/users/create';
    var resp = [];
    alert('Add service');
    this.http.post(Url, JSON.stringify(data)).toPromise()
    .then(res => {
        if(res.json().data.status=="success"){
            alert(res.json().data.message)
        }
      })
      .catch(this.handleError);
  }
  
  getData() 
  { 
    var Url='http://localhost:1337/users/details';
    var resp = [];
    return this.http.get(Url)
      .map((res:Response) => {resp = res.json().data; console.log(resp); return resp;});
  }


  private handleError(error: any): Promise<any> 
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}