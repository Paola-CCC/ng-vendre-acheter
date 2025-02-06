import { Component } from '@angular/core';

import { faker } from '@faker-js/faker';
import { ProductService } from '@features/product/services/product.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';
import { ModalService } from '@shared/components/modal/modal.service';

import {
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalContentComponent } from '@shared/components/modal-content/modal-content.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-products-list',
  standalone: true,
  imports: [CardComponent , ButtonComponent],
  templateUrl: './all-products-list.component.html',
  styleUrl: './all-products-list.component.scss'
})
export class AllProductsListComponent {

  productsList: any[] = [];



  constructor(private readonly productService: ProductService,
    private modalService: ModalService,
    private router: Router
  ) {}

  @ViewChild('viewRef', { static: true, read: ViewContainerRef }) 
   vcr!: ViewContainerRef;




  ngOnInit(): void {

    if (this.router.url === '/good_deals'){
      this.getGoodDealsProduct();
    } else {
      this.getBestSold();
    }
  }


  getGoodDealsProduct(): void {
    this.productService.getGoodDealsProduct().subscribe({
      next: (data: any) => {
        this.productsList = data.map((obj : any) => {
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

  getBestSold() {
    this.productService.getBestSold().subscribe({
      next: (data: any) => {
        this.productsList = data.map((obj : any) => {
          if (Object.keys(obj).includes('imgSrc')) {
            return { ...obj, imgSrc: faker.image.url() };
          }
          return obj;
        });
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });  }  


  openModalTemplate(view: TemplateRef<Element>) {
    this.modalService.open(this.vcr, view, {
      animations: {
        modal: {
          enter: 'enter-slide-down 0.8s',
        },
        overlay: {
          enter: 'fade-in 0.8s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '40rem',
      },
    });
  }

  openModalComponent() {
    this.modalService.open(ModalContentComponent, {
      animations: {
        modal: {
          enter: 'enter-scaling 0.3s ease-out',
          leave: 'fade-out 0.1s forwards',
        },
        overlay: {
          enter: 'fade-in 1s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '40rem',
      },
    });
  }

  close() {
    this.modalService.close();
  }
}
