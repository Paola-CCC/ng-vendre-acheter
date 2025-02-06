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
  
  totalQte: number = 0;

  myArrayType = {
    id: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 100),
    name:'Shirt Cotton T-shirt',
    counter: 2,
    img_url: 'https://thumbor.comeup.com/unsafe/fit-in/630x354/filters:quality(90):no_upscale()/uploads/media/picture/2021-05-17/joshua-woroniecki-hxgugpd1dls-unsplash-60a268ea7a499.jpg',
  };

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
    this.totalQte = qte;
  }

  addData() {
    this.myArray.push({...this.myArrayType, 
      id:  Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 100),
    });
    this.localStorageService.saveData(this.myArray);
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
      if( e.id === id){
         e.counter = Number(event.target.value);
         return e;
      }
     return e;
    });


    this.localStorageService.update(data);

  }
}
