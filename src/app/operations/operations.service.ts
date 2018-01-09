import { Injectable }    from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, DatabaseReference } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

export class Message
{
  status:string
  message:string
}
@Injectable()
export class OperationsService 
{
  parkingdetails:  AngularFireList<any[]>;
  private headers = new Headers({'Content-Type': 'application/json'});
  private Url = 'http://localhost/parking_lot/public' // URL to web api
  ticketdata=  {};
  constructor(public http:Http, private firebasedb: AngularFireDatabase, private fb: FirebaseApp) {
    this.parkingdetails = this.firebasedb.list('ticketdata');

  }
  getData(ComponentName:any) 
  {
    var ref = firebase.database().ref("ticketdata");
    return  this.parkingdetails=this.firebasedb.list('ticketdata');  
   
    }



   getDatabyId(id:any) 
  {
    
    console.log(this.parkingdetails=this.firebasedb.list('ticketdata/'+ id))
    return   this.parkingdetails=this.firebasedb.list('ticketdata/'+ id);  
      
    
    
  }

 sendTo():any
 {
  return this.ticketdata;
 }
 add(data:any,ComponentName:any):void
  {
    this.ticketdata=data;
    console.log(data);
    
    this.parkingdetails.push(data);
  }


  update(data:any,id:any,ComponentName:any ):void
  {
    // alert(JSON.stringify(data));
    // alert(id);
    firebase.database().ref("ticketdata/"+id).remove();
    this.parkingdetails = this.firebasedb.list('ticketdata');
    this.parkingdetails.push(data);
  }
  
  private handleError(error: any): Promise<any> 
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}