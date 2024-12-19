import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-group',
  standalone: true,
  templateUrl: './section-group.component.html',
  styleUrls: ['./section-group.component.scss']
})
export class SectionGroupComponent implements OnInit {

  
  @Input({required:true}) text: string = '' ;
  @Input() path: {
    path: string,
    name: string
  } = { path: '', name: ''} ;


  constructor() { }

  ngOnInit() {
    console.log(" path ", this.path  )
  }

}
