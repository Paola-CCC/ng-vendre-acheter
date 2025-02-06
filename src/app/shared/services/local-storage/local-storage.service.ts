import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'myData';
  private myArray: any[] = [];


  saveData(data: any): void {
    this.myArray.push(data);
    localStorage.setItem(this.storageKey, JSON.stringify(this.myArray));
  }

  update(data: any[]){
    localStorage.setItem(this.storageKey, JSON.stringify(data));

  }

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
    
  }

  checkIsEmpty() {
    const data = localStorage.getItem(this.storageKey);

    if ( data ){
      return JSON.parse(data).length <= 0  ?  this.clearData() : null;

    } 
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }

  getLengthDataCart(){
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data).length : 0;
  }
}
