import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

const fname=new FormControl('', Validators.required);
const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
const role=new FormControl('', Validators.required);
const uname=new FormControl('', Validators.required);
const mobile=new FormControl('', Validators.required);

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {}

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
  }

  onSubmit(form:NgForm) {
    alert(JSON.stringify(form.value));
    this.authService.add(form.value);
  }

}
