import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private service:UserService) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    clearInterval(this.service.timer);
    this.router.navigate(['/login']);
  }

}
