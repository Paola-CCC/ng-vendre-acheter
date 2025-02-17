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

  getAllProducts(): Observable<any> {
    return this.http.get<any>(API + 'products' );
  }  

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(API + 'products' + '/' +  id );
  }  

  getProductShearched( reduction: string = '', category: string = '', brands:string = '', priceGte: string = '' , priceLte:string = ''): Observable<any> {
    return this.http.get<any>(API + 'products' + '/?reduction=' +  reduction + '&category='+ category + '&brands=' + brands + '&price_gte='+ priceGte + '&price_lte=' + priceLte);
  }  
  
  getAllCategories(): Observable<any> {
    return this.http.get<any>(API + 'categories' );
  }  

  getBestSold(): Observable<any> {
    return this.http.get<any>(API + 'best_sold' );
  }  

  getProductShearchedBestSold( reduction: string = '', category: string = '', brands:string = '', priceGte: string = '' , priceLte:string = ''): Observable<any> {
    return this.http.get<any>(API + 'best_sold' + '/?reduction=' +  reduction + '&category='+ category + '&brands=' + brands + '&price_gte='+ priceGte + '&price_lte=' + priceLte);
  }  
  

  getGoodDealsProduct(): Observable<any> {
    return this.http.get<any>(API + 'good_deals' );
  }  

  getProductShearchedGoodDeals( reduction: string = '', category: string = '', brands:string = '', priceGte: string = '' , priceLte:string = ''): Observable<any> {
    return this.http.get<any>(API + 'good_deals' + '/?reduction=' +  reduction + '&category='+ category + '&brands=' + brands + '&price_gte='+ priceGte + '&price_lte=' + priceLte);
  }  
  



  getSavingOptions(): Observable<any> {
    return this.http.get<any>(API + 'saving_options' );
  } 

}
