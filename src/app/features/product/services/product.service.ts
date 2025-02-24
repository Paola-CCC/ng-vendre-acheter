import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  addProduct(body: any): Observable<any> {
    return this.http.post<any>(API + 'products', body );
  } 

  getAllProducts(): Observable<any> {
    return this.http.get<any>(API + 'products' );
  }  

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(API + 'products' + '/' +  id );
  }  


  getProductShearched( 
    
    reduction?: string,
    category?: string,
    brands?: string,
    priceGte?: string,
    priceLte?: string  
  
  ): Observable<any> {

    let params = new HttpParams();
  
    if (reduction) params = params.set('reduction', reduction);
    if (category) params = params.set('category', category);
    if (brands) params = params.set('brands', brands);
    if (priceGte) params = params.set('price_gte', priceGte);
    if (priceLte) params = params.set('price_lte', priceLte);
    return this.http.get<any>(API + 'products',{ params });
  }  


  getProductShearchedByTitleAndDescription( 
    title?: string,  
  ): Observable<any> {

    let params = new HttpParams();

    if (title) params = params.set('q', title);

    return this.http.get<any>(API + 'products',{ params });
  }  





  
  getAllCategories(): Observable<any> {
    return this.http.get<any>(API + 'categories' );
  } 
  
  getAllCriterias(): Observable<any> {
    return this.http.get<any>(API + 'seach_criterias' );
  } 

  getBestSold(): Observable<any> {
    return this.http.get<any>(API + 'best_sold' );
  }  

  getProductShearchedBestSold(
    reduction?: string,
    category?: string,
    brands?: string,
    priceGte?: string,
    priceLte?: string
  ): Observable<any> {
    let params = new HttpParams();
  
    if (reduction) params = params.set('reduction', reduction);
    if (category) params = params.set('category', category);
    if (brands) params = params.set('brands', brands);
    if (priceGte) params = params.set('price_gte', priceGte);
    if (priceLte) params = params.set('price_lte', priceLte);
    
    return this.http.get<any>(`${API}best_sold`, { params });
  }
  

  getGoodDealsProduct(): Observable<any> {
    return this.http.get<any>(API + 'good_deals' );
  }  

  getProductShearchedGoodDeals( 
    reduction?: string,
    category?: string,
    brands?: string,
    priceGte?: string,
    priceLte?: string

  ): Observable<any> {

    let params = new HttpParams();
  
    if (reduction) params = params.set('reduction', reduction);
    if (category) params = params.set('category', category);
    if (brands) params = params.set('brands', brands);
    if (priceGte) params = params.set('price_gte', priceGte);
    if (priceLte) params = params.set('price_lte', priceLte);

    return this.http.get<any>(API + 'good_deals' , { params });
  }  
  
  getSavingOptions(): Observable<any> {
    return this.http.get<any>(API + 'saving_options' );
  } 

  calculerReductionDetail(prixInitial: number, pourcentage: number) {
    const montantReduction = prixInitial * (pourcentage / 100);
    return prixInitial - montantReduction;
  };

}
