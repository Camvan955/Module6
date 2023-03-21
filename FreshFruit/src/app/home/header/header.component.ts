import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {SecurityService} from "../../service/authentication/security.service";
import {Router} from "@angular/router";
import {ShareService} from "../../service/authentication/share.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: any;
  username = ''
  role: string = "";

  constructor(private tokenStorageService: TokenStorageService,
              private securityService: SecurityService,
              private router: Router,
              private shareService: ShareService) {
    this.securityService.getIsLoggedIn().subscribe(next => {
      this.isLoggedIn = next;
    });
    this.securityService.getUserLoggedIn().subscribe(next => {
      this.user = next;
    });
  }

  getRole() {
    let roles = '';
    if (this.tokenStorageService.getRole()) {
      roles = this.tokenStorageService.getRole()[0];
      console.log(roles);
    }
    return roles;
  }

  ngOnInit(): void {
  this.shareService.getClickEvent().subscribe(next => {
    this.role = this.getRole();
  })
  }

  logout() {
    this.tokenStorageService.logout();
    this.securityService.setIsLoggedIn(null, false);
    this.router.navigateByUrl('home');
    this.shareService.sendClickEvent();
  }
}
