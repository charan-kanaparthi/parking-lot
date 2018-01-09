import { Component , OnInit,ViewChild,Inject,ElementRef} from '@angular/core';
import { Http } from '@angular/http';
import { Router ,ActivatedRoute}            from '@angular/router';
import { NgForm } from '@angular/forms';
import { OperationsService } from './operations.service';
import{Renderer} from  '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

const urls=["assets/myscripts/init.js"];

@Component({
  templateUrl: 'operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class SlotAllotmentComponent implements OnInit 
{
  isForm=true;
  isShow=false;
  fields:any[]=[];//form fields
  forms:any[]=[];
  slots:any[]=[];
  theads:String[]=[];//table heading fields
  componentName="Vehicle Parking";//to display on the page
  modalfields:any[]=[];
  color:any[][];
  selectedId:any;
  slot_details:any[]=[];
  public data=null;
  public parking_data:any;
  deletemodalfields:any[]=[];
  tfields={"ticket":null,"slot_no":null,"car_no":null,"name":null,"status":null,"parking_time":null,"exit_time":null,"fare":null,"no_of_parking_hours":null,"extra_fee":null,"extra_time":null};  
  selectedData={"ticket":null,"phone_no":null,"slot_no":null,"car_no":null,"name":null,"status":null,"parking_time":null,"exit_time":null,"fare":null,"no_of_parking_hours":null,"extra_fee":null,"extra_time":null};  
 
  ffiels=["Id","slot_no","car_no","status","operation","name"];  
  closeResult: string;
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit()
  {
    this.isForm=true;
    // this.loadScript();
  }

  public loadScript() 
  {
        // console.log('preparing to load...')
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

  constructor(private router: Router,private parkingService: OperationsService, private modalService: NgbModal,private http:Http, @Inject(Renderer) private renderer: Renderer,public activatedRoute: ActivatedRoute) 
  {
     var  test={name:'state',id:'state', value:'',type:'select',label:'State',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Andhra Pradesh"]};
     this.fields.push(test);
     test={name:'city',id:'city', value:'',type:'select',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["kakinada"]};
     this.fields.push(test);
      var i=0;
      var j=1;
       j=1
       while(j<=66){
          var clr={color:"bg-primary",slot_no:j,Id:0,car_no:0};       
          this.slot_details.push(clr);
          j++;
       }

       this.getparking_data();   
      //deletemodal fields
      test={name:'name',id:'name',type:'text',value:'',label:'Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'car_no',id:'car_no',type:'text',value:'',label:'Car No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'slot_no',id:'slot_no',type:'number',value:'',label:'Ticket',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'phone_no',id:'phno', value:'',type:'number',label:'Phone No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'status',id:'status',type:'hidden',label:'',value:'delete',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);

}
    onSubmit(form:NgForm) 
  { 
    if(form.value.state!=""&&form.value.city!=""){
           this.isShow=true
    }else{
        alert("please select the state and city")
    }
     
  }
onUpdate(form1:NgForm){
        this.selectedData.status="deleted"
        if(form1.value.name==this.selectedData.name&&form1.value.slot_no==this.selectedData.slot_no&&form1.value.car_no==this.selectedData.car_no && form1.value.phone_no==this.selectedData.phone_no){
                  //  this.parkingService.update(form1.value,this.selectedId,"parking_details");
                   var millis=Date.now() - +(new Date(this.selectedData.parking_time));
                   var parking_milis=this.selectedData.no_of_parking_hours*3600000;
                   var diff=parking_milis-millis;
                   var exit_time=Date.now();
                   this.selectedData.exit_time=exit_time;
                   if(diff>=0){
                    // alert("no fee");
                    // alert(JSON.stringify(form1.value));
                      this.parkingService.update(this.selectedData,this.selectedId,"parking_details");
                     alert("unparked");
                     this.router.navigate(['/'], {relativeTo: this.activatedRoute});
                   }else{
                       //var hour=Math.round(millis / (1000*60*60)) % 24;
                         var diff=Math.abs(diff);
                         var extra_time=Math.round((diff / 1000)/ 60*60);
                         var extrafee=extra_time*10;
                         alert("hi "+form1.value.name+"  you have parked extra time of  "+extra_time+" hours"+"\n you have to pay extra fee of "+extrafee+" rupees"+"\n  thank  you");
                         this.selectedData.status=form1.value["status"];
                         this.selectedData.extra_fee=form1.value["extra_fee"];
                         this.selectedData.extra_time=form1.value["extra_time"];
                         
                         var newForm={status:form1.value["status"],extra_fee:extrafee,extra_time:extra_time};  
                      //  alert(JSON.stringify(newForm));
                          this.parkingService.update(this.selectedData,this.selectedId,"parking_details");        
                         alert("unparked");
                         this.router.navigate(['/'], {relativeTo: this.activatedRoute});
 
                   }
           }else{
             alert("in valid details ")
           }
        
      
}
  
  getparking_data() 
  {
   
    var x= this.parkingService.getData("parking_details");
    x.snapshotChanges().subscribe(item =>
     { 
       
       this.parking_data=[];
       item.forEach(element=>{
         var y = element.payload.toJSON();
        
         this.parking_data.push(y );
         var no= y['slot_no'];
          this.slot_details[no-1].color="bg-danger";
          this.slot_details[no-1].car_no=y['car_no'];
          this.slot_details[no-1].Id=element['key'];
          //console.log(this.slot_details[no-1]);
       });
     });

 
    
  }

  getDatabyId(id:any){

    var x= this.parkingService.getDatabyId(id);
var string1=""
    x.snapshotChanges().subscribe(item =>
      { 
        
        // this.selectedData=[];
        // item[0].payload.toJSON
        item.forEach(element=>{
         
          var y = element.payload.toJSON();
          this.selectedData[element.key]=y;
         
          // console.log(y);
          // this.selectedData.push(y);
          // console.log(this.selectedData);
          //  console.log(y);
        });
      });
      // console.log(this.selectedData)
  }


  hi(iteam:any){
    // alert(iteam);
    this.slot_details[iteam-1].name="bg-danger";
    
  }

 onSelect(item:any){
this.selectedId=item;
   this.getDatabyId(item);
 
}

 slotBook(sid:any){
    //this.router.navigate(['/receivers', {id:sid} ]);
if(this.slot_details[sid-1].color!="bg-danger"){
    this.router.navigate(['../parking_booking',{id:sid}], {relativeTo: this.activatedRoute});
 
} else{
  alert("already booked");
}

 }
}