import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { StarsGroupComponent } from '../stars-group/stars-group.component';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterLink } from '@angular/router';
import { FavorisStorageService } from '@shared/services/favoris-storage/favoris-storage.service';
import { ProductService } from '@features/product/services/product.service';
import { IProduct } from '@features/product/interfaces/product';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [StarsGroupComponent,ButtonComponent ,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit, AfterViewInit{

  @Input({required: false}) id: string |number | null = null;
  @Input({required: false}) type:string = '';
  @Input({required: false}) imgSrc:string = '';
  @Input({required: false}) title:string = '';
  @Input({required: false}) price: number | null = null;
  @Input({required: false}) content:string = '';
  @Input({required: false}) productNote:number | null = null;
  @Input({required: false}) description:string = '';
  @Input({required: false}) reductionPercentage: number| null = null;
  @Input({required: false}) categoryName: string | undefined = "";
  
  @Input({required:false}) obj: IProduct = {} as IProduct ;
  
  @ViewChild("heartRef") heartRef?: ElementRef<HTMLElement>;

  priceReduction: number | null = null ;

  constructor(
    private router: Router,
    private favorisStorage: FavorisStorageService,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.favorisStorage.getData();

    if(this.price && this.reductionPercentage ){
      this.priceReduction = this.productService.calculerReductionDetail(this.price, this.reductionPercentage)
    }
  }

  ngAfterViewInit(): void {
    let isFavoris = this.favorisStorage.searchFavoris(this.obj);
    if(isFavoris ){      
      this.heartRef?.nativeElement.classList.add('selected');
    } 
  }

  checkSelected(){
    this.favorisStorage.saveData(this.obj);
    this.heartRef?.nativeElement.classList.toggle('selected');
  }

  goTo(){
    this.router.navigate(['/product/', this.id])
  }
}
