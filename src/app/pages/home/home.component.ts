import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { NgFor, NgForOf, NgStyle } from '@angular/common';
import { SectionGroupComponent } from "../../shared/components/section-group/section-group.component";
import { ProductService } from '@features/product/services/product.service';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, NgStyle, CardComponent, SectionGroupComponent],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoriesList: any[] = [];

  bestSoldProduct: any[] = [];

  goodDealsProduct: any[] = [];

  bgImg: string = "https://www.dldp-dressing.fr/public/img/big/AdobeStock237791258jpeg_5ddd7f087a95c.jpeg";

  console = console;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getBestSold();
    this.getGoodDealsProduct();
  }

  getCategories(): void {
    this.productService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categoriesList = data;
        console.log('Categories fetched:', data);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  getBestSold(): void {
    this.productService.getBestSold().subscribe({
      next: (data: any) => {
        this.bestSoldProduct = data;
        console.log('bestSoldProduct fetched:', data);
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
  }

  getGoodDealsProduct(): void {
    this.productService.getGoodDealsProduct().subscribe({
      next: (data: any) => {
        this.goodDealsProduct = data;
        console.log('goodDealsProductfetched:', data);
      },
      error: (err) => {
        console.error('Error fetching goodDealsProduct:', err);
      }
    });
  }


}
