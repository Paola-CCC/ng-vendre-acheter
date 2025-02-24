import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { FavorisStorageService } from '@shared/services/favoris-storage/favoris-storage.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [  RouterModule ,NgClass, FormsModule  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  /** indique si navbar mobile est ouvert */
  mobileNavbarIsOpen: boolean = false;
  /** Id de l'utilisateur */
  userIsLogger: boolean | null= true;

  user: any = {
    name: 'Lucienne'
  }

  /** valeur saisie sur le searchInput */
  searchInput: string = '';

  cartItemsCount: number | null = null;

  favorisCount: number | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private storageCart: LocalStorageService,
    private storageFavoris: FavorisStorageService

  ) { }

  ngOnInit(): void {
    this.userIsLogger = this.auth.isLoggedIn;    

    this.storageCart.getTotalQty();
    this.storageCart.totalQtyCart$.subscribe(qty => {
      this.cartItemsCount = qty;
    });

    this.storageFavoris.favorisList$.subscribe(qty => {
      this.favorisCount = qty;
    })
  }


  logOut(){
    this.auth.logOutNow();
    this.router.navigate(['']);
    window.location.reload();

  }

  openMobileNavbar() {
    if(this.mobileNavbarIsOpen ){
      this.mobileNavbarIsOpen = false;
      document.body.style.overflow = 'auto';
    } else {
      this.mobileNavbarIsOpen = true;
      document.body.style.overflow = 'hidden';

    }
  };

  public searchProductHeader(){

    this.router.navigate(
      ['/product'],
      {queryParams:
        { name: 'title', value: this.searchInput }
      }
    );
    this.searchInput = '';

    }

  }




