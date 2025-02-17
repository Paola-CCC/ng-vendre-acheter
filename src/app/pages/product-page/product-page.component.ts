import { NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@features/product/services/product.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NgClass],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {

  @ViewChild('imageSrc') imageSrc!: ElementRef;

  console = console;

  item: string[] = [];

  chosenQuantity: number = 0; 

  contentType : any ;

  cartStorage : any[] = [];

  /** id du produit */
  id: string = '';

  constructor(private localStorageService: LocalStorageService, 
    private productService: ProductService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];

    this.productService.getProductById(this.id).subscribe({
      next:(data: any) => { 
        this.contentType = data ;
      },
      error: (err) => {
        console.error('Error fetching goodDealsProduct:', err);
      }
    })
  }

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
