import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@core/interfaces/user';
import { environment } from '@environments/environment';

const API: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _userIsLogged: boolean = false;
  private readonly TOKEN_KEY = 'token_Data';
  private readonly USER_DATA = 'user_Data';
  
  constructor( private http: HttpClient) { }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(this.TOKEN_KEY);
    return authToken !== null ?  true : false;
  }

  createUser( username: string, email: string, password: string, picture:string ){
     return this.http.post<any>(API + 'register', {
      username: username,
      email: email,
      password:password,
      profilePicture: picture
    });
  }

  loginUser(email: string, password: string){
    return this.http.post<any>('https://dummyjson.com/auth/login', {
      username: email,
      password:password,
      expiresInMins: 30
    });
  }

  public saveUserInfo(userInfos: any, token: string): void {
    localStorage.setItem(this.USER_DATA, JSON.stringify(userInfos));
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  public getUser() {
    const data = localStorage.getItem(this.USER_DATA);
    return data ? JSON.parse(data) : {};
  }

  public getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public logOutNow(){
    const data = localStorage.getItem(this.USER_DATA);
    if(data){
      localStorage.removeItem(this.USER_DATA);
      localStorage.removeItem(this.TOKEN_KEY);
    }
    
    this._userIsLogged = false;
    window.location.reload();

  }

}
