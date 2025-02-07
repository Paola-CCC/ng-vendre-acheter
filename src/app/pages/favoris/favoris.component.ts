import { Component, DoCheck, OnInit } from '@angular/core';
import { ProductService } from '@features/product/services/product.service';
import { faker } from '@faker-js/faker';
import { CardComponent } from '@shared/components/card/card.component';
import { FavorisStorageService } from '@shared/services/favoris-storage/favoris-storage.service';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.scss'
})
export class FavorisComponent implements OnInit , DoCheck{

  constructor(
    private readonly productService: ProductService,
    private storageFavoris: FavorisStorageService
  
  ) {}
  goodDealsProduct: any[] = [];


  ngOnInit(): void {
    this.getGoodDealsProduct();
  }
  
  ngDoCheck(): void {
    this.getGoodDealsProduct();

  }

  getGoodDealsProduct(): void {

    this.goodDealsProduct = this.storageFavoris.getData().map((obj : any) => {
      if (Object.keys(obj).includes('imgSrc')) {
        return { ...obj, imgSrc: faker.image.url() };
      }
      return obj;
    });
  }
}
