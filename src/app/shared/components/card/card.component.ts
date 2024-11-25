import { Component, Input } from '@angular/core';
import { StarsGroupComponent } from '../stars-group/stars-group.component';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [StarsGroupComponent,ButtonComponent ,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input({required: false}) type:string = '';
  @Input({required: false}) imgSrc:string = 'https://blaque.fr/wp-content/uploads/2022/01/beyonce.webp';
  @Input({required: false}) title:string = '';
  @Input({required: false}) price:string = '';
  @Input({required: false}) content:string = '';
  @Input({required: false}) productNote:number | null = null;
  @Input({required: false}) description:string = '';
  @Input({required: false}) reductionPercentage:string = '';

}
