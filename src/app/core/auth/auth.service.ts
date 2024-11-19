import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userIsLogged = false;
  
  constructor() { }

  logOutNow(){
    if(localStorage.getItem('user')){
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
    
    window.location.reload();

  }

}
