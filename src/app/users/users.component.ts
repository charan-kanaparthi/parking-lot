import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';

const fname=new FormControl('', Validators.required);
const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
const role=new FormControl('', Validators.required);
const uname=new FormControl('', Validators.required);
const mobile=new FormControl('', Validators.required);



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})



export class UsersComponent implements OnInit {

  rows=[];
  login :any;
  columns=[
    { name: 'Full Name' },
    {name:'User Name'},
    {name : 'Email ID'},
    {name:'Mobile Number'}
  ];

  usersData:any;

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private userService: UsersService) {}
 
  ngOnInit() {
    this.form = this.fb.group( {
      fname:fname,
      email: [null , Validators.compose ( [ Validators.required ] )],
      role:role,
      password: password,
      confirmPassword: confirmPassword,
      uname:uname,
      mobile:mobile
    } );
    setTimeout(()=>{this.getData()}, 2000);
    this.userService.getData().subscribe((users=>this.login=users));
    
  }
  
  getData()
  {
    this.userService.getData().subscribe((data)=>{this.usersData=data});
    setTimeout(()=>{this.rows=this.usersData}, 2000);
    
  }
  
  onSubmit(form:NgForm) {
    alert(JSON.stringify(form.value));
    this.userService.addUser(form.value);
  }

  
}
