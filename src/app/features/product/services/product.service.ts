import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';


const API: string = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}
  
  getAllCategories(): Observable<any> {
    return this.http.get<any>(API + 'categories' );
  }  

  getBestSold(): Observable<any> {
    return this.http.get<any>(API + 'best_sold' );
  }  

  getGoodDealsProduct(): Observable<any> {
    return this.http.get<any>(API + 'good_deals' );
  }  

  getTrademark(): Observable<any> {
    return this.http.get<any>(API + 'trademark' );
  } 

}
