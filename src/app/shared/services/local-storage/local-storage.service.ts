import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'myData';

  private totalQtySubject = new BehaviorSubject<number>(0); 
  totalQtyCart$: Observable<number> = this.totalQtySubject.asObservable();

  set totalQtyCart(qty: number) {
    this.totalQtySubject.next(qty); 
  }

  get totalQtyCart(): number {
    return this.totalQtySubject.value;
  }

  public saveData(data: any): void {
  
    let storedData = this.getData();
    storedData = Array.isArray(storedData) ? storedData : [];
  
    let existingItem = storedData.find((item: any) => item.id === data.id);
  
    if (existingItem) {  
      existingItem.counter += 1;
    } else {  
      storedData.push({ ...data, counter: 1 });
    }


    localStorage.setItem(this.storageKey, JSON.stringify(storedData));
    this.updateTotalQty(storedData);
  }


  public getTotalQty(){
    const storedData = this.getData();
    this.updateTotalQty(storedData);
  }

  private updateTotalQty(storedData: any[]): void {
    storedData = Array.isArray(storedData) ? storedData : [];
    let qty = 0;
    const total = storedData.map((e:any) => qty += e.counter);
    this.totalQtyCart = qty;
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
