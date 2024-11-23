import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-group',
  standalone: true,
  templateUrl: './section-group.component.html',
  styleUrls: ['./section-group.component.scss']
})
export class SectionGroupComponent implements OnInit {

  
  @Input() text: string = '' ;


  constructor() { }

  ngOnInit() {
  }

}
