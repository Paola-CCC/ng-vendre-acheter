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
  @Input({ required: true })
  text!: string;

  @Input({ required: true })
  type!: string;

  @Input({ required: false })
  isRequired!: boolean;

  @Output()
  clickEvent = new EventEmitter()


  handleClick(){
    this.clickEvent.emit()
  }

}
