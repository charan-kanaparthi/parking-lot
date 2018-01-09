import { Component , OnInit,ViewChild,Inject,ElementRef} from '@angular/core';
import { Http } from '@angular/http';
import { Router ,ActivatedRoute}            from '@angular/router';
import { NgForm } from '@angular/forms';
import { OperationsService } from './operations.service';
import{Renderer} from  '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
const urls=["assets/myscripts/init.js"];

@Component({
  templateUrl: 'ticket.component.html'
})

export class TicketComponent implements OnInit 
{
  isForm=true;
  isShow=false;
  fields:any[]=[];//form fields
  slots:any[]=[];
  theads:String[]=[];
  modalfields:any[]=[];
  
  car_no=null;
  slot_no=null;
  no_of_parking_hours=null;
  fare=null;
  name=null;
  phone_no=null;
  public data=null;
  today: number = Date.now();
  backgroundImg:any;
  params:any;

   tfields=["Id","ticket","slot_no","car_no","status","parking_time","exit_time","floor_no","slot_no","fare","no_of_parking_hours","extra_fee","extra_time"];  
       
  ngOnInit()
  {
    this.isForm=true;
    this.loadScript();
  }

  public loadScript() 
  {
        console.log('preparing to load...')
        urls.forEach(function(url) 
        {   
          let node = document.createElement('script');
          node.src = url;
          node.type = 'text/javascript';
          node.async = true;
          node.charset = 'utf-8';
          document.getElementsByTagName('body')[0].appendChild(node);
        });
  }

  constructor(private sanitizer:DomSanitizer,private router: Router,private parkingService: OperationsService, private http:Http, @Inject(Renderer) private renderer: Renderer,public route: ActivatedRoute) 
  {
       this.backgroundImg = sanitizer.bypassSecurityTrustStyle('url(assets/img/avatars/ticket.png)');
          this.params=this.parkingService.sendTo();
           //alert("bye");
           // alert(this.params);

            this.car_no = this.params.car_no;
            //alert(this.params.car_no);
            this.slot_no = this.params.slot_no;
            this.no_of_parking_hours = this.params.no_of_parking_hours;
            this.fare = this.params.fare;
            this.name = this.params.name;
            this.phone_no = this.params.phone_no;
            


}
    onSubmit(form:NgForm) 
  { 
    
        this.router.navigate(['../slot_allotment'], {relativeTo: this.route});
 
  }





}