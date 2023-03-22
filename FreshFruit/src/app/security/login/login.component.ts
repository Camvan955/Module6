import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {SecurityService} from "../../service/authentication/security.service";
import {Title} from "@angular/platform-browser";
import {ShareService} from "../../service/authentication/share.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  roles: string[] = [];
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
    if (this.formGroup.valid) {
      this.securityService.login(this.formGroup.value).subscribe(
        data => {
          if (this.formGroup.value.rememberMe) {
            this.tokenStorageService.saveTokenLocal(data.token);
            this.tokenStorageService.saveUserLocal(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          } else {
            this.tokenStorageService.saveTokenSession(data.token);
            this.tokenStorageService.saveUserSession(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          }
          const user = this.tokenStorageService.getUser();
          console.log(user);
          this.securityService.setIsLoggedIn(user, true);
          this.shareService.sendClickEvent();
          const id = this.tokenStorageService.getIdAccount();
          this.roles = this.tokenStorageService.getRole();
          this.router.navigateByUrl('home');
          this.formGroup.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đăng nhập thành công!',
            showConfirmButton: false,
            timer: 1500
          })
        }, error => {

          if (error.status == 406) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Đăng nhập thất bại!',
              showConfirmButton: false,
              timer: 1500
            })
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
