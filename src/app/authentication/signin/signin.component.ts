import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { AuthenticationService } from 'app/authentication/authentication.service';
import { UsersService } from 'app/users/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  login:any;
  result = false;
  arr:any;
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,private userservice:UsersService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { }
    ngOnInit()
    {
      this.form = this.fb.group ( {
        uname: [null , Validators.compose ( [ Validators.required ] )] , password: [null , Validators.compose ( [ Validators.required ] )]
      } );
    // reset login status
      this.authenticationService.logout();
      // get return url from route parameters or default to '/'
      this.returnUrl = 'home';
      this.userservice.getData().subscribe((users=>this.login=users));
    }

  onSubmit(form:NgForm) 
  {
     this.loading = true;
    //alert("log obj..."+this.login);
    for(let i=0; i< this.login.length; i++)
    {
        // alert("use..."+form.value['uname']);
        if (this.login[i].userName === form.value['uname'] && this.login[i].password === form.value['password'])
        {
            this.result=true;
            console.log("User Found" , this.login[i]);
            this.arr =this.login[i];
            // alert("arr.."+this.arr);
            var name = form.value['uname'];
            alert("use..."+this.login[i].userName);
            // alert("sign in nmm.."+name);
            this.userservice.setUserLoggedIn(name);
            return this.authenticationService.login(form.value)
            .subscribe(
            data => {
            this.router.navigate([this.returnUrl]);
            },
            error => {this.loading = false;}); 
        }
    }    
    if(this.result==false)
    {
      console.log("Not Found");
      alert("please fill correct details");
      form.resetForm();
    }

 }
}






