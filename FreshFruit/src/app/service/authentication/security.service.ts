import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})

export class SecurityService {
  httpOptions: any;
  isLoggedIn = false;
  isLoggedInObservable = new Subject<boolean>();
  isUserObservable = new Subject<any>();

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  /**
   * funtion: login
   */
  login(obj: any): Observable<any> {
    return this.http.post(AUTH_API + 'sign-in', {
      username: obj.username,
      password: obj.password
    }, this.httpOptions);
  }

  /**
   * funtion: sign-up
   */
  register(obj: any): Observable<any> {
    console.log(obj);
    return this.http.post(AUTH_API + 'sign-up', {
      name: obj.name,
      username: obj.username,
      email: obj.email,
      password: obj.password,
    }, this.httpOptions);
  }

  /**
   * funtion: setIsLoggedIn
   */
  setIsLoggedIn(user: any, isLoggedIn: boolean) {
    this.isLoggedInObservable.next(isLoggedIn);
    this.isUserObservable.next(user);
  }

  /**
   * funtion: getUserLoggedIn
   */
  getUserLoggedIn(): Observable<any> {
    return this.isUserObservable.asObservable();
  }

  /**
   * funtion: getIsLoggedIn
   */
  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInObservable.asObservable();
  }

  getInfoCustomer(idAccount: number): Observable<Account> {
    return this.http.get<Account>(AUTH_API + 'info/'+ idAccount);
  }
}
