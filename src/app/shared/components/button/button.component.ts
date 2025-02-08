import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  
  @Input({ required: false })
  type!: string;

  @Input({ required: false })
  isRequired!: boolean;

  @Input({ required: false })
  disabled: boolean = false;

  @Output()
  clickEvent = new EventEmitter()


  handleClick(){
    this.clickEvent.emit()
  }

}
