import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input({ required: true })
  text!: string;

  @Output()
  clickEvent = new EventEmitter()


  handleClick(){
    this.clickEvent.emit()
  }

}
