import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
formModel= {
  UserName:"",
  FirstName:"",
  LastName:"",
  Email:"",
  Password:""
}
  constructor(private service:UserService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.formModel = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }
  
  onSubmit(form:NgForm){
    this.service.registration(this.formModel).subscribe(
      (res:any) => {
        if(res.Succeeded){
          this.resetForm(form);
          console.log("registration successful")
      }
        else{
          console.log("registration successful" + res.Errors[0])
        }
      }
    );
   }
  }