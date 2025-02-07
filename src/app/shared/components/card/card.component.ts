import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { StarsGroupComponent } from '../stars-group/stars-group.component';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterLink } from '@angular/router';
import { FavorisStorageService } from '@shared/services/favoris-storage/favoris-storage.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [StarsGroupComponent,ButtonComponent ,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit  , AfterViewInit{

  @Input({required: false}) id: number | null = null;
  @Input({required: false}) type:string = '';
  @Input({required: false}) imgSrc:string = 'https://blaque.fr/wp-content/uploads/2022/01/beyonce.webp';
  @Input({required: false}) title:string = '';
  @Input({required: false}) price:string = '';
  @Input({required: false}) content:string = '';
  @Input({required: false}) productNote:number | null = null;
  @Input({required: false}) description:string = '';
  @Input({required: false}) reductionPercentage:string = '';

  @Input({required:false}) obj = {}
  
  @ViewChild("heartRef") heartRef?: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    private favorisStorage: FavorisStorageService
  ){}

  ngOnInit(): void {
    this.favorisStorage.getData();
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
