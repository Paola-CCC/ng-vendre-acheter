import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

  console = console;

  @ViewChild('imageSrc') imageSrc!: ElementRef;

  item: any[] = [];

  chosenQuantity: number = 0; 

  contentType = {
    id: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 1000),
    title:"nike shoes",
    description: "La conception AF1 confortable et intemporelle de ce classique revisité associe des tons neutres riches à des détails hivernaux. Tissu CORDURA résistant, notamment à l'abrasion, pour un look et une sensation de chaleur qui surmonteront l'épreuve du temps et des intempéries.",
    counter: 2,
    imgs_url: [
      "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg",
      "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg",
      "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg",
      "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
    ],
  };


  constructor(private localStorageService: LocalStorageService) {}


  updatePreview(item: any){
    this.imageSrc.nativeElement.src = item;
  }


  addToCart() {
    this.localStorageService.saveData(this.contentType);
  }

  chooseQuantity(event: any){
   this.chosenQuantity = event.target.value;
  }



}
