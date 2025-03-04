import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '@features/product/interfaces/product';
import { ProductService } from '@features/product/services/product.service';
import { StarsGroupComponent } from '@shared/components/stars-group/stars-group.component';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NgClass, StarsGroupComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {

  @ViewChild('imageSrc') imageSrc!: ElementRef;

  console = console;

  item: string[] = [];

  chosenQuantity: number = 0; 

  product: IProduct = {} as IProduct ;

  cartStorage: any[] = [];

  object = Object

  /** id du produit */
  id: string = '';

  @Input({required: false}) productNote:number | null = null;
  

  constructor(private localStorageService: LocalStorageService, 
    private productService: ProductService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];

    this.productService.getProductById(this.id).subscribe({
      next:(data: IProduct) => { 
        this.product = data ;
      },
      error: (err) => {
        console.error('Error fetching goodDealsProduct:', err);
      }
    })
  }

  getReductionPrice(prixInitial: number, pourcentage: number){
    return this.productService.calculerReductionDetail(prixInitial, pourcentage);
  }


  updatePreview(item: any){
    this.imageSrc.nativeElement.src = item;
  }

  addToCart() {
    this.localStorageService.saveData(this.product);
  }

  chooseQuantity(event: any){
   this.chosenQuantity = event.target.value;
  }



}
