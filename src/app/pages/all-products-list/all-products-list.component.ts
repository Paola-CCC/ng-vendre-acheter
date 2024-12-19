import { Component } from '@angular/core';

import { faker } from '@faker-js/faker';
import { ProductService } from '@features/product/services/product.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-all-products-list',
  standalone: true,
  imports: [CardComponent , ButtonComponent],
  templateUrl: './all-products-list.component.html',
  styleUrl: './all-products-list.component.scss'
})
export class AllProductsListComponent {

  constructor(private readonly productService: ProductService
  ) {}
  goodDealsProduct: any[] = [];





  ngOnInit(): void {
    this.getGoodDealsProduct();
  }


  getGoodDealsProduct(): void {
    this.productService.getGoodDealsProduct().subscribe({
      next: (data: any) => {
        this.goodDealsProduct = data.map((obj : any) => {
          if (Object.keys(obj).includes('imgSrc')) {
            return { ...obj, imgSrc: faker.image.url() };
          }
          return obj;
        });
      },
      error: (err) => {
        console.error('Error fetching goodDealsProduct:', err);
      }
    });
  }

  onCreateModal(): void {
  
  }

}
