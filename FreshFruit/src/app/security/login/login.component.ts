import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {SecurityService} from "../../service/authentication/security.service";
import {Title} from "@angular/platform-browser";
import {ShareService} from "../../service/authentication/share.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  roles: string[] = [];
  returnUrl = '/';
  errors = {username: '', password: ''};

  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rememberMe: new FormControl(false)
  });

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private route: ActivatedRoute,
              private securityService: SecurityService,
              private titleService: Title) {
    this.titleService.setTitle("Đăng nhập")
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  login() {
    this.errors = {username: '', password: ''};
    this.errorMessage = '';
    if (this.formGroup.valid) {
      this.securityService.login(this.formGroup.value).subscribe(
        data => {
          console.log(data);
          if (this.formGroup.value.rememberMe) {
            this.tokenStorageService.saveTokenLocal(data.token);
            this.tokenStorageService.saveUserLocal(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          } else {
            this.tokenStorageService.saveTokenSession(data.token);
            this.tokenStorageService.saveUserSession(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          }
          const user = this.tokenStorageService.getUser();
          this.securityService.setIsLoggedIn(user, true);
          this.shareService.sendClickEvent();
          const username = this.tokenStorageService.getUsername();
          this.roles = this.tokenStorageService.getRole();
          this.router.navigateByUrl('home');
          this.formGroup.reset();
          // this.toast.success('Đăng nhập thành công.', 'Thông báo', {
          //   timeOut: 2000, positionClass: 'toast-top-center'
          // }
          // );
        }, error => {

          if (error.status == 406) {
            this.errorMessage = error.error.message;
            // this.toast.error(this.errorMessage, 'Thất bại'
            //   , {positionClass: 'toast-top-center'});
          }
          this.securityService.isLoggedIn = false;
          if (error.error.errors) {
            for (let i = 0; i < error.error.errors.length; i++) {
              if (error.error.errors && error.error.errors[i].field === 'username') {
                this.errors.username = error.error.errors[i].defaultMessage;
              }
              if (error.error.errors && error.error.errors[i].field === 'password') {
                this.errors.password = error.error.errors[i].defaultMessage;
              }
            }
          }
        }
      );
    }
  }
}
