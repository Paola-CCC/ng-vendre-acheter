import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { NgStyle } from '@angular/common';
import { SectionGroupComponent } from "../../shared/components/section-group/section-group.component";
import { ProductService } from '@features/product/services/product.service';
import { CardComponent } from '@shared/components/card/card.component';
import { SwiperContainer } from 'swiper/element';
import { faker } from '@faker-js/faker';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, NgStyle, CardComponent, SectionGroupComponent],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {

  categoriesList: any[] = [];
  bestSoldProduct: any[] = [];
  goodDealsProduct: any[] = [];
  savingOptions: any[] = [];

  canShowArrow : boolean = false;

  randomName : any;

  bgImg: string = "https://www.dldp-dressing.fr/public/img/big/AdobeStock237791258jpeg_5ddd7f087a95c.jpeg";

  console = console;

  breakpoints = {
    400: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    850: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
    1440: {
      slidesPerView: 6,
    }
  }

  breakpointsCard1 = {
    400: {
      slidesPerView: 1,
    },
    850: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 3,
    }
  }

  @ViewChild('swiper') swiper?:  ElementRef<SwiperContainer>;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getBestSold();
    this.getGoodDealsProduct();
    this.getSavingOptions();
  }

  getCategories(): void {
    this.productService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categoriesList = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  getBestSold(): void {
    this.productService.getBestSold().subscribe({
      next: (data: any) => {
        let datas = data.map((obj : any) => {
          if (Object.keys(obj).includes('imgSrc')) {
            return { ...obj, imgSrc: faker.image.url() };
          }
          return obj;
        });
          

        this.bestSoldProduct = datas;
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
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

  getSavingOptions(): void {
    this.productService.getSavingOptions().subscribe({
      next: (data: any) => {
        
        this.savingOptions = data;
      },
      error: (err) => {
        console.error('Error fetching savingOptions:', err);
      }
    });
  }
  onPrevClick(swiper: SwiperContainer) {
    swiper?.swiper.slidePrev()
  }

  onNextClick(swiper: SwiperContainer) {
    swiper?.swiper.slideNext();
  }

  getImageRandom(){
    return faker.image.url();
  }
}
