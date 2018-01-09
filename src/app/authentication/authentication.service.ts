import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class Message
{
  status:string
  message:string
}
@Injectable()
export class AuthenticationService 
{
  private headers = new Headers({'Content-Type': 'application/json'});
  private isUserLoggedIn;
  public username;
  constructor(private http: Http , private httpClient:HttpClient) { 
    this.isUserLoggedIn=false;
  }
  
  setUserLoggedIn()
  {
    this.username='admin';
    this.isUserLoggedIn=true;
  }
  getUserLoggedIn()
  {
    return this.isUserLoggedIn;
  }
  
 add(data:any):void
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

  login(data:any) 
    {
        return this.httpClient.post<any>('http://localhost:1337/users/login',JSON.stringify(data)).map(user => {
        if (user && user.token) 
        {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
        });
    }
    

    logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    }
  
  private handleError(error: any): Promise<any> 
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}