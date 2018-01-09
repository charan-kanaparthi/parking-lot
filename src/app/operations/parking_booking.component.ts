import { Component , OnInit,ViewChild,Inject,ElementRef} from '@angular/core';
import { Http } from '@angular/http';
import { Router,ActivatedRoute,NavigationExtras }            from '@angular/router';
import { NgForm } from '@angular/forms';
import { OperationsService } from './operations.service';
import{Renderer} from  '@angular/core';
const urls=["assets/myscripts/init.js"];

@Component({
 templateUrl: 'parking_booking.component.html'
})
export class ParkingBookingComponent implements OnInit 
{
  isForm=true;
  fields:any[]=[];
  slot_no=0;
  isShow=false;
  showDetails="More Details";
  item_data:any[]=[];
  isCard=false;
  noOfItems=0;
  isRemove=true;
  total=0;
  fare=0;
  ngOnInit()
  {
    this.isForm=true;
    this.loadScript();
   // alert("this id "+this.slot_no);
  
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

  constructor(private router: Router,private parkingService: OperationsService, private http:Http, @Inject(Renderer) private renderer: Renderer ,public Activatedroute: ActivatedRoute) 
  {
    //Fields
     
    this.slot_no = this.Activatedroute.snapshot.params['id']; 
    
    var data={itemDescription:'',quantity:'',kgs:'',cdm:'',freightCharge:''};
    this. item_data.push(data); 

     var  test={name:'name',id:'name', value:'',type:'text',label:'Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     test={name:'phone_no',id:'phno', value:'',type:'number',label:'Phone No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     test={name:'status',id:'', value:'active',type:'hidden',label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);

      
  }
    onSubmit(form:NgForm) 
  { 
      var val=form.value
        if(val.name==""){
          alert("please enter the name ");
          return;
         }
         if(val.phone_no==""){
          alert("please enter the phone no ");
          return;
         }else{
           if(val.phone_no.length!=10){
            alert("please enter the valid  phone no ");
            return;
           }
         }

         if(val.car_no==""){
          alert("please enter the car no ");
          return;
         }
         if(val.no_of_parking_hours==0){
          alert("please enter the no of parking hours ");
          return;
         }
        else{
          var newarray={"car_no":val.car_no,"exit_time":"","extra_fee":0,"extra_time":0,"ticket":val.slot_no,"parking_time": Date.now(),"slot_no":val.slot_no, "no_of_parking_hours":val.no_of_parking_hours,"fare":val.fare,"name":val.name,"phone_no":val.phone_no,"status":"active"}
          this.parkingService.add(newarray,"parking_details");
           this.router.navigate(['../ticket',], {relativeTo: this.Activatedroute});

        }
       }
  
  id(){
    
  }
  priceChange(form2:NgForm){

    this.fare=form2.value['no_of_parking_hours']*20.0;
  }



}
