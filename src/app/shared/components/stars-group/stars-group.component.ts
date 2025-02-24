import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-stars-group',
  standalone:true,
  templateUrl: './stars-group.component.html',
  styleUrls: ['./stars-group.component.scss']
})
export class StarsGroupComponent {

  choiceArray: number[] = [1,2,3,4,5];
  
  @Input({required: true}) note:number = 0 ;

}
