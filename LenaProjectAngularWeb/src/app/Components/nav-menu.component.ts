import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public Token!: any;
  collapse() {
    this.isExpanded = false;
  }
  public userName! : any;
  constructor(private userService: UserService) { }
    
    ngOnInit(): void {
      this.Token = localStorage.getItem("userToken");
      this.userName = localStorage.getItem("userName");
    }
    
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logOut() {
    this.userService.logout();
  }
}
