import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userDetails;
  constructor(private service:UserService) { }

  ngOnInit() {
    this.service.getUserClaims().subscribe(
      res => {
        this.userDetails = res;
        this.service.UserName = this.userDetails.UserName;
        this.service.Email =this.userDetails.Email;
      },
      err => {
        console.log(err)
      }
    );

    
  }

}
