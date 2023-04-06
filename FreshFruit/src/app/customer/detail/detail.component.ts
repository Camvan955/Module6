import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {SecurityService} from "../../service/authentication/security.service";
import {Account} from "../../entity/account";
import {Token} from "@angular/compiler";
import {TokenStorageService} from "../../service/authentication/token-storage.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  customer: Account = {idAccount: 0, name: '', password: '', email: '', phoneNumber: '', address: '', avatar: ''};


  constructor(private title: Title,
              private securityService: SecurityService,
              private tokenStorageService: TokenStorageService) {
    this.title.setTitle('Thông tin khách hàng');
    this.securityService.getInfoCustomer(parseInt(this.tokenStorageService.getIdAccount())).subscribe(data => {
      this.customer = data;
    });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }
}
