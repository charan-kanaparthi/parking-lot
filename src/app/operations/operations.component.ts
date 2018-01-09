import { Component , OnInit,ViewChild,Inject,ElementRef} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import { Router }            from '@angular/router';

import{Renderer} from  '@angular/core';
const urls=[
  // "assets/myscripts/datepick.js",
  // "assets/myscripts/jquery-1.11.3.min.js",
  // "assets/myscripts/bootstrap-datepicker.min.js",
];

@Component({
  templateUrl: 'operations.component.html'
})
export class OperationsComponent implements OnInit 
{
  isForm=false;
  ngOnInit()
  {
    this.isForm=false;
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

  constructor(private router: Router, private http:Http,private modalService: NgbModal, @Inject(Renderer,) private renderer: Renderer)
  {}

}
