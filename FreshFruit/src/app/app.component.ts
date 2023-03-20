import { Component } from '@angular/core';
import {TokenStorageService} from "./service/authentication/token-storage.service";
import {SecurityService} from "./service/authentication/security.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FreshFruit';
  isLoggedIn = false;
  user: any;
  constructor(private tokenStorageService: TokenStorageService,
              private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.securityService.getIsLoggedIn().subscribe(next => {
      this.isLoggedIn = next;
    });
    this.securityService.getUserLoggedIn().subscribe(next => {
      this.user = next;
    });
    if (this.tokenStorageService.getToken() != null) {
      this.user = this.tokenStorageService.getUser();
      this.securityService.setIsLoggedIn(this.user, true);
    }
  }
}
