import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName:"",
    Password:""
  }
  isLoginError : boolean = false;
  constructor(private service:UserService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.service.login(this.formModel.UserName,this.formModel.Password).subscribe((data : any)=>{
      localStorage.setItem('token',data.access_token);
      this.router.navigate(['/quiz']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }

}
