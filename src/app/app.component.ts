import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,HeaderComponent , FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements DoCheck {

  pathURL : string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  ngDoCheck() {
    this.pathURL = this.router.url;
  };
   

}
