import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { NgStyle } from '@angular/common';
import { SectionGroupComponent } from "../../shared/components/section-group/section-group.component";
import { ProductService } from '@features/product/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, NgStyle, SectionGroupComponent],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Correction ici
})
export class HomeComponent implements OnInit {
  categoriesList: any[] = [];
  bgImg: string = "https://www.dldp-dressing.fr/public/img/big/AdobeStock237791258jpeg_5ddd7f087a95c.jpeg";

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.getCategories();
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
}
