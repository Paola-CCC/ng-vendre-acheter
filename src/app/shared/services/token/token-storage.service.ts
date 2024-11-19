import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor( public router: Router) {}


  getToken(){
    const storage = localStorage.getItem('access_token')
    return storage;
  }

  setToken(data : any) {
    const jsonData = JSON.stringify(data)
    return localStorage.setItem('access_token', jsonData)
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    if (removeToken == null) {
      this.router.navigate(['register']);
    }
  }
}
