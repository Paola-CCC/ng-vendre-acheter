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
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

export interface IProduct {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  brands: string;
  reduction?: number;
  imgs_url: string[];
}

@Component({
  selector: 'app-all-products-list',
  standalone: true,
  imports: [CardComponent, ButtonComponent, CommonModule ,ReactiveFormsModule],
  templateUrl: './all-products-list.component.html',
  styleUrl: './all-products-list.component.scss'
})
export class AllProductsListComponent {

  productsList: IProduct[] = [];

  filtrerForm = this.fb.group({
    reductions: [''],
    brands: [''],
    categories: [''],
    minPrice: [null],
    maxPrice: [null]
  })
  /** indique si le formulaire a été envoyé ou non  */
  submitted: boolean = false;
  /** indique si s'inscription a réussi ou non  */
  signUpIsSuccessful = false;
  errorMessage = '';

  reductionList: any[] = [];
  brandsList: any[] = [];
  categoriesList: any[] = [];

  console = console;

  listSelected: string[]= [];

  queryIsEmpty: boolean = true;

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


      if( Object.values(params).length > 0 ){
        query.name = params.name;
        query.value = params.value;   
      }
   
    });

    if( query.value !== ''  ){      
      this.filtrerForm.patchValue({
        [query.name]: query.value
      });



      this.getProductShearched();
    } else {
      this.getdatas();
    }

    this.productService.getAllCriterias().subscribe({
      next: (data: any) => {
        this.reductionList = data.reduction;
        this.categoriesList = data.categories.map((e:any) => ({
          label: e.label,
          slug: e.slug
        }));
        this.brandsList = data.brands; 
      },
      error: (err) => {
        console.error('Error fetching getProductShearchedGoodDealst:', err);
      }
      })
    this.data();

  }

  /** Vérifie si le formulaire est vide */
  isFormEmpty(): boolean {
    const formValues = this.filtrerForm.value;
  
    return Object.values(formValues).every(
      value => value === null || value === '' || (Array.isArray(value) && value.length === 0)
    );
  }

  /** Affiche tableau des conditions de recherche  */
  data() {

    const data = [];
    for (const [key, content] of Object.entries(this.controlFilterForm)) {
      if( key === 'brands' && (content.value !== '' && content.value !== null )){
        data.push(`Marque: ${content.value}`);
      } else if(key === 'categories' && (content.value !== '' && content.value !== null )) {

        const found = this.categoriesList.find((element) => element.slug === content.value );

        data.push(`Catégorie: ${found.label}`);
      } else if(key === 'reductions' && (content.value !== '' && content.value !== null )) {
        data.push(`Réduction: -${content.value}%`);
      } else if((key === 'minPrice' || key === 'maxPrice') && content.value !== null) {
        data.push(`Min: ${content} € - Max: ${content.value} €`);
      } 
    }

    this.listSelected = data ;

  }

  /** Router pour Appel API selon path URL */
  getdatas(){    
    if (this.router.url === '/good_deals') {
      this.getGoodDealsProduct();
    } else if(this.router.url === '/best_sold')  {
      this.getBestSold();
    } else if(this.router.url.includes('/product')  ){      
      this.getAllProduct();
    }
    this.data();

  }

  /** Affiche les bonnes affaires */
  getGoodDealsProduct(): void {
    this.productService.getGoodDealsProduct().subscribe({
      next: (data: any) => {
        this.productsList = data;
      },
      error: (err) => {
        console.error('Error fetching goodDealsProduct:', err);
      }
    });
  }

  /** Affiche les recherches parmis bonnes affaires */
  getProductShearchedGoodDeals() {

    let min = this.minPrices.value !== null ? this.minPrices.value : '';
    let max = this.maxPrices.value !== null ? this.minPrices.value : '';

    this.productService.getProductShearchedGoodDeals( this.reductions.value, this.categories.value , this.brands.value, min , max).subscribe({
      next: (data: any) => {
        this.productsList = data;
      },
      error: (err) => {
        console.error('Error fetching getProductShearchedGoodDealst:', err);
      }
    });
  }

  /** Affiche les meilleures ventes */
  getBestSold() {
    this.productService.getBestSold().subscribe({
      next: (data: any) => {
        this.productsList = data;
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
  }
  /** Affiche les recherches parmi les meilleurs ventes */
  getProductShearchedBestSold() {

    let min = this.minPrices.value !== null ? this.minPrices.value : '';
    let max = this.maxPrices.value !== null ? this.minPrices.value : '';

    this.productService.getProductShearchedBestSold( this.reductions.value, this.categories.value , this.brands.value, min , max).subscribe({
      next: (data: any) => {
        this.productsList = data;
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
  }

  /** Affiche tous les produits */
  getAllProduct() {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.productsList = data;
      },
      error: (err) => {
        console.error('Error fetching getAllProduct:', err);
      }
    });
  }

  /** Affiche les recherches parmi toutes les produits */
  getProductShearched() {

    let min = this.minPrices.value !== null ? this.minPrices.value : '';
    let max = this.maxPrices.value !== null ? this.minPrices.value : '';

    this.productService.getProductShearched( this.reductions.value, this.categories.value , this.brands.value, min , max).subscribe({
      next: (data: any) => {
        this.productsList = data;
      },
      error: (err) => {
        console.error('Error fetching bestSoldProduct:', err);
      }
    });
  }

  /** Router pour Appel API de recherche selon path URL */
  getCorrectSearchedData(){
    if (this.router.url === '/good_deals') {
      this.getProductShearchedGoodDeals();
    } else if(this.router.url === '/best_sold')  {
      this.getProductShearchedBestSold();
    } else {
      this.getProductShearched();
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

  // openModalComponent() {
  //   this.modalService.open(ModalContentComponent, {
  //     animations: {
  //       modal: {
  //         enter: 'enter-scaling 0.3s ease-out',
  //         leave: 'fade-out 0.1s forwards',
  //       },
  //       overlay: {
  //         enter: 'fade-in 1s',
  //         leave: 'fade-out 0.3s forwards',
  //       },
  //     },
  //     size: {
  //       width: '40rem',
  //     },
  //   });
  // }

  close() {
    this.modalService.close();
  }

  /** Met le formulaire avec ses valeurs par défaut */
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
    this.setDefaultValue();
    this.getdatas();
  }

  // getAllSearchDetail(data: any){
  //   this.reductionList = [...new Set(data
  //     .map((e: any) => e.reduction)
  //     .filter((r: any) => r !== "")
  //     .sort()
  //   )];

  //   this.brandsList = [...new Set(data
  //     .map((e:any) => e.brands)          
  //     .filter((r: any) => r !== "")
  //     .sort()
  //   )];

  //   this.categoriesList = [...new Set(data
  //     .map((e:any) => e.category)
  //     .filter((r: any) => r !== "")
  //     .sort()
  //   )];

  // }

  onSubmit() {

    this.submitted = true;

    if (this.filtrerForm.invalid) {
      return;
    }
  }
}
