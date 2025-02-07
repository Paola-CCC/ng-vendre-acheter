import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavorisStorageService {

  private storageKey = 'favoris';
  private favorisListSubject = new BehaviorSubject<number>(0); 
  favorisList$: Observable<number> = this.favorisListSubject.asObservable();
  
  set totalQtyFavoris(qtyFavoris: number) {
    this.favorisListSubject.next(qtyFavoris); 
  }

  get totalQtyFavoris(): number {
    return this.favorisListSubject.value;
  }

  public saveData(data: any): void {
  
    let storedData = this.getData();
    storedData = Array.isArray(storedData) ? storedData : [];
  
    let existingItem = storedData.find((item: any) => item.id === data.id);
  
    if (existingItem) {  
      storedData = storedData.filter((item: any) => item.id !== data.id);
    } else {  
      storedData.push(data);
    }
    this.getTotalQtyFavoris();

    localStorage.setItem(this.storageKey, JSON.stringify(storedData));
    this.totalQtyFavoris = storedData.length;

  }

  public searchFavoris(data:any){
    let storedData = this.getData();
    storedData = Array.isArray(storedData) ? storedData : [];
  
    let existingItem = storedData.find((item: any) => item.id === data.id);

    if (storedData.length === 0) {
      this.clearData();
    }

    this.getTotalQtyFavoris();
    if (existingItem) {
      return true;
    } else {  
      return false;
    }
  }

  public getTotalQtyFavoris(){
    this.totalQtyFavoris = this.getData().length;
  }
    
  public update(data: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    if (this.getData().length === 0) {
      this.clearData();
    }
  }

  public getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  public clearData(): void {
    localStorage.removeItem(this.storageKey);
  }

  public getLengthDataCart() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data).length : 0;
  }

}


