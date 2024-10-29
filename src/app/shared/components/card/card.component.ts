import { Component, Input } from '@angular/core';
import { StarsGroupComponent } from '../stars-group/stars-group.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [StarsGroupComponent,ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input({required: true}) imgSrc:string = 'https://blaque.fr/wp-content/uploads/2022/01/beyonce.webp';
  @Input({required: true}) title:string = '';
  @Input({required: true}) price:string = '';
  @Input({required: true}) content:string = '';
  @Input({required: true}) itemNote:any;

}
