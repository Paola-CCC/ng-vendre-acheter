import { Component, OnInit } from '@angular/core';
import { ProductService } from '@features/product/services/product.service';
import { faker } from '@faker-js/faker';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.scss'
})
export class FavorisComponent implements OnInit {

  constructor(private readonly productService: ProductService) {}
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
}
