import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements DoCheck {

  @ViewChild('quantityInput') quantityInput!: ElementRef<HTMLInputElement>;


  myArray: any[] = [];

  totalPricing: number  = 0;
  
  totalQty: number = 0;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.myArray = this.localStorageService.getData();
    this.getTotalPricing();
  }

  ngDoCheck(){
    this.getTotalPricing();
  }

  getTotalPricing(){
    let countTotal = 0;
    let qte = 0;
    this.myArray.map((e) => {
      countTotal +=  (e.price * e.counter);
      qte += e.counter;
    });
  
    this.totalPricing = countTotal;
    this.totalQty = qte;
    this.localStorageService.totalQtyCart = qte;


  }

  clearStorage() {
    this.localStorageService.clearData();
    this.myArray = [];
  }

  deleteItem(id: number) {
    let data = this.myArray.filter((e) => e.id !== id);
    this.myArray = data;
    this.localStorageService.update(data);
  }

  updateQuantity(id: number, event:any){
    let data = this.myArray.map((e) => {
      if(e.id === id){
        e.counter = Number(event.target.value);
        return e;
      }
     return e;
    });
    
    this.localStorageService.update(data);

  }
}
