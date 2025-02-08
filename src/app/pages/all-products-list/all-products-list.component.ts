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
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-all-products-list',
  standalone: true,
  imports: [CardComponent, ButtonComponent, CommonModule ,ReactiveFormsModule],
  templateUrl: './all-products-list.component.html',
  styleUrl: './all-products-list.component.scss'
})
export class AllProductsListComponent {

  productsList: any[] = [];


  filtrerForm = this.fb.group({
    reductions: [''],
    brands: [''],
    categories: [''],
    minPrice: new FormControl(null),
    maxPrice: new FormControl(null)
  })
  /** indique si le formulaire a été envoyé ou non  */
  submitted: boolean = false;
  /** indique si s'inscription a réussi ou non  */
  signUpIsSuccessful = false;
  errorMessage = '';

  reductionList: number[] = [10, 25, 50, 75];
  brandsList: string[] = ["Nike", "Puma", "Asics", "Adidas"];
  categoriesList: string[] = ["bags", "shoes"];

  objJS = Object;

  console = console;

  listSelected: string[]= [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly productService: ProductService,
    private modalService: ModalService
  ) { }

  get reductions(): any {
    return this.filtrerForm.get('reductions');
  }

  get brands(): any {
    return this.filtrerForm.get('brands');
  }

  get categories(): any {
    return this.filtrerForm.get('categories');
  }

  get minPrices(): any {
    return this.filtrerForm.get('minPrice');
  }

  get maxPrices(): any {
    return this.filtrerForm.get('maxPrice');
  }

  get controlFilterForm(): { [key: string]: AbstractControl } {
    return this.filtrerForm.controls;
  }

  @ViewChild('viewRef', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  ngOnInit(): void {

    const query = {
      name: '',
      value: ''
    };

    let sub = this.route.queryParams.subscribe((params: any) => {
      query.name = params.name
      query.value = params.value      
    });

    if( query.name !== '' ){
      this.filtrerForm.patchValue({
        [query.name]: query.value
      });

      this.getProductShearched();
    } else {
      this.getdatas();
    }

    this.data();

  }

  data() {

    const data = [ ]
    for (const [key, value] of Object.entries(this.controlFilterForm)) {
      if( key === 'brands' && (value.value !== '' && value.value !== null )){
        data.push(`Marque: ${value.value}`);
      } else if(key === 'categories' && (value.value !== '' && value.value !== null )) {
        data.push(`Catégorie: ${value.value}`);
      } else if(key === 'reductions' && (value.value !== '' && value.value !== null )) {
        data.push(`Réduction: -${value.value}%`);
      } else if((key === 'minPrice' || key === 'maxPrice') && value.value !== null) {
        data.push(`Min: ${value} € - Max: ${value.value} €`);
      } 
    }

    this.listSelected = data ;

  }

  getdatas(){
    if (this.router.url === '/good_deals') {
      this.getGoodDealsProduct();
    } else if(this.router.url === '/best_sold')  {
      this.getBestSold();
    } else {
      this.getAllProduct();
    }
    this.data();

  }


  getGoodDealsProduct(): void {
    this.productService.getGoodDealsProduct().subscribe({
      next: (data: any) => {
        this.productsList = data.map((obj: any) => {
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

  getAllProduct() {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.productsList = data.map((obj: any) => {
          if (Object.keys(obj).includes('imgSrc')) {
            return { ...obj, imgSrc: faker.image.url() };
          }
          return obj;
        });
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
  }

  getBestSold() {
    this.productService.getBestSold().subscribe({
      next: (data: any) => {
        this.productsList = data.map((obj: any) => {
          if (Object.keys(obj).includes('imgSrc')) {
            return { ...obj, imgSrc: faker.image.url() };
          }
          return obj;
        });
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
  }

  getProductShearched() {

    let min = this.minPrices.value !== null ? this.minPrices.value : '';
    let max = this.maxPrices.value !== null ? this.minPrices.value : '';

    this.productService.getProductShearched( this.reductions.value, this.categories.value , this.brands.value, min , max).subscribe({
      next: (data: any) => {
        this.productsList = data.map((obj: any) => {
          if (Object.keys(obj).includes('imgSrc')) {
            return { ...obj, imgSrc: faker.image.url() };
          }
          return obj;
        });
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
  }

  getProductShearchedGoodDeals() {

    let min = this.minPrices.value !== null ? this.minPrices.value : '';
    let max = this.maxPrices.value !== null ? this.minPrices.value : '';

    this.productService.getProductShearchedGoodDeals( this.reductions.value, this.categories.value , this.brands.value, min , max).subscribe({
      next: (data: any) => {
        this.productsList = data.map((obj: any) => {
          if (Object.keys(obj).includes('imgSrc')) {
            return { ...obj, imgSrc: faker.image.url() };
          }
          return obj;
        });
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
  }

  getProductShearchedBestSold() {

    let min = this.minPrices.value !== null ? this.minPrices.value : '';
    let max = this.maxPrices.value !== null ? this.minPrices.value : '';

    this.productService.getProductShearchedBestSold( this.reductions.value, this.categories.value , this.brands.value, min , max).subscribe({
      next: (data: any) => {
        this.productsList = data.map((obj: any) => {
          if (Object.keys(obj).includes('imgSrc')) {
            return { ...obj, imgSrc: faker.image.url() };
          }
          return obj;
        });
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
  }

  getCorrectSearchedData(){
    if (this.router.url === '/good_deals') {
      this.getProductShearchedGoodDeals();
    } else if(this.router.url === '/best_sold')  {
      this.getProductShearchedBestSold();
    } else {
      this.getProductShearched()
    }
    this.data();

  }


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


  setDefaultValue() {
    this.filtrerForm.setValue({
      reductions:'',
      brands: '',
      categories: '',
      minPrice: null,
      maxPrice: null
    });
  }


  onReset(): void {
    this.submitted = false;
    this.filtrerForm.reset();
    this.getdatas();
  }

  onSubmit() {

    this.submitted = true;

    if (this.filtrerForm.invalid) {
      return;
    }
  }
}
