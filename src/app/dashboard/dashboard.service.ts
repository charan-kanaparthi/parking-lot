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
export class DashboardService 
{
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { 
  }
  
  getChartData()
  { 
    var Url='http://localhost:1337/charts/getCurrentDayData ';
    var resp = [];
    Url=Url;
    return this.http.get(Url)
      .map((res:Response) => {resp = res.json().data; console.log(resp); return resp;});
  }

  getBarGraphData()
  { 
    var Url='http://localhost:1337/charts/getPreviousDaysData ';
    var resp = [];
    Url=Url;
    return this.http.get(Url)
      .map((res:Response) => {resp = res.json(); console.log(resp); return resp;});
  }

   private handleError(error: any): Promise<any> 
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}