import { NgClass } from '@angular/common';
import { Component, input, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars-group',
  standalone:true,
  imports:[NgClass],
  templateUrl: './stars-group.component.html',
  styleUrls: ['./stars-group.component.scss']
})
export class StarsGroupComponent implements OnInit{

  @Input({required: false}) className: string = '';
  @Input({required: true}) note:number = 0 ;
  choiceArray: number[] = [1,2,3,4,5];
  /** taille des étoiles */
  size:string = ''; 

    ngOnInit(): void {
      if (this.className !== '') {
        this.size = this.className;
      }
    }
}
