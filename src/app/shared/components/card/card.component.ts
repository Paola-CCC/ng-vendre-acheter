import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { StarsGroupComponent } from '../stars-group/stars-group.component';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [StarsGroupComponent,ButtonComponent ,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {

  @Input({required: false}) id: number | null = null;
  @Input({required: false}) type:string = '';
  @Input({required: false}) imgSrc:string = 'https://blaque.fr/wp-content/uploads/2022/01/beyonce.webp';
  @Input({required: false}) title:string = '';
  @Input({required: false}) price:string = '';
  @Input({required: false}) content:string = '';
  @Input({required: false}) productNote:number | null = null;
  @Input({required: false}) description:string = '';
  @Input({required: false}) reductionPercentage:string = '';
  
  @ViewChild("heartRef") heartRef?: ElementRef<HTMLElement>;

  checkSelected(heart:any){
    this.heartRef?.nativeElement.classList.toggle('selected');
  }

  constructor(private router: Router){

  }

  goTo(){
    this.router.navigate(['/product/', this.id])
  }
}
