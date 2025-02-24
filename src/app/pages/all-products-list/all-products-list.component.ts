import { Component } from '@angular/core';

import { ProductService } from '@features/product/services/product.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';
import { ModalService } from '@shared/components/modal/modal.service';

import {
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ICategory, ICriterias, IProduct } from '@features/product/interfaces/product';



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
  /** Affiche la liste des réductions */
  reductionList: number[] = [];
  /** Affiche la liste des marques */
  brandsList: string[] = [];
  /** Affiche la liste des catégories */
  categoriesList: ICategory[] = [];

  console = console;

  listSelected: string[]= [];

  queryIsEmpty: boolean = true;

  titleOrDescription: string = '';

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


    this.productService.getAllCriterias().subscribe({
      next: (data: ICriterias) => {
        this.reductionList = data.reduction;
        this.categoriesList = data.categories.map((e: ICategory) => ({
          label: e.title,
          slug: e.slug
        }));
        this.brandsList = data.brands;
    
        if (this.categoriesList.length > 0) {

          this.route.queryParams.subscribe((params: any) => {
            if (Object.values(params).length > 0) {
              query.name = params.name;
              query.value = params.value;
            }
          });

          console.log('getter S ' , this.filtrerForm.get(query.name)  );
          


          if (this.filtrerForm.get(query.name) && query.name !== '' && query.value !== '') {
            // Le contrôle existe
            this.console.log( ' YAAA ')
            this.filtrerForm.patchValue({
              [query.name]: query.value
            });
            this.getProductShearched();

            
          } else if (this.filtrerForm.get(query.name) === null && query.name === 'title' && query.value !== ''){
            // Le contrôle n'existe pas
            this.console.log( 'BOFF BOF ');
            this.getProductShearchedHeader(query.value);
          } else if( query.name === '' && query.value === ''){
            this.getdatas();

          }
    
          // if (query.value !== '') {
          //   this.filtrerForm.patchValue({
          //     [query.name]: query.value
          //   });
          //   this.getProductShearched();
          // } else {
          //   this.getdatas();
          // }
    
          this.dataSelected();
        }
      },
      error: (err) => {
        console.error('Error fetching getProductShearchedGoodDealst:', err);
      }
    });
    
    

  }

  /** Vérifie si le formulaire est vide */
  isFormEmpty(): boolean {
    const formValues = this.filtrerForm.value;
  
    return Object.values(formValues).every(
      value => value === null || value === '' || (Array.isArray(value) && value.length === 0)
    );
  }

  /** Affiche tableau des conditions de recherche  */
  dataSelected() {

    const data = [];
    let minMax = "" ;

    for (const [key, content] of Object.entries(this.controlFilterForm)) {
      if( key === 'brands' && (content.value !== '' && content.value !== null )){
        data.push(`Marque: <b>${content.value}</b>`);
      } else if(key === 'categories' && (content.value !== '' && content.value !== null )) {

        const found = this.categoriesList.find((element) => element.slug == content.value );

        if(found !== undefined ) {
          data.push(`Catégorie: <b>${found.label}</b>`);
        }
      } else if(key === 'reductions' && (content.value !== '' && content.value !== null )) {
        data.push(`Réduction: <b>- ${content.value}%</b>`);
      } else if((key === 'minPrice' || key === 'maxPrice') && content.value !== null) {

        if( key === 'minPrice'){
          minMax += `Min: <b>${content.value}€</b> - `
        } else {
          minMax += `Max: <b> ${content.value}€</b>`;
        }  
      }

    }

    if( minMax !== ''){
      data.push(minMax);
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
    this.dataSelected();

  }

  /** Affiche les bonnes affaires */
  getGoodDealsProduct(): void {
    this.productService.getGoodDealsProduct().subscribe({
      next: (data: IProduct[]) => {
        this.productsList = data;
      },
      error: (err) => {
        console.error('Error fetching goodDealsProduct:', err);
      }
    });
  }

  /** Affiche les recherches issus du header titre et description */
  getProductShearchedHeader(titleOrDescription: string) {

    this.productService.getProductShearchedByTitleAndDescription(titleOrDescription).subscribe({
      next: (data: IProduct[]) => {
        this.productsList = data;
      },
      error: (err) => {
        console.error('Error fetching getProductShearchedGoodDealst:', err);
      }
    });
  }


    /** Affiche les recherches parmis bonnes affaires */
    getProductShearchedGoodDeals() {

      let min = this.minPrices.value !== null ? this.minPrices.value : '';
      let max = this.maxPrices.value !== null ? this.minPrices.value : '';
  
      this.productService.getProductShearchedGoodDeals( this.reductions.value, this.categories.value , this.brands.value, min , max).subscribe({
        next: (data: IProduct[]) => {
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
      next: (data: IProduct[]) => {
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
      next: (data: IProduct[]) => {
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
    this.dataSelected();

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



  close() {
    this.modalService.close();
  }

  /** Met Min et Max avec leur valeur par défaut */
  setMinMaxDefaultValue() {      
    this.filtrerForm.patchValue({
      minPrice: null,
      maxPrice: null
    });
  }
  


  onReset(): void {
    this.submitted = false;
    this.filtrerForm.reset();
    this.getdatas();
  }

}
