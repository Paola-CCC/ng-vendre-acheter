import { Routes } from '@angular/router';
import { CartPageComponent } from '@pages/cart-page/cart-page.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProductAddComponent } from '@pages/product-add/product-add.component';
import { ProductPageComponent } from '@pages/product-page/product-page.component';
import { RegistrationComponent } from '@pages/registration/registration.component';
import { UserProfileComponent } from '@pages/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: '/accueil', 
    pathMatch: 'full',
  },
  {
    path: 'accueil',
    component: HomeComponent,
  },
  {
    path: 'connexion',
    component: LoginComponent,
  },
  {
    path: 'inscription',
    component: RegistrationComponent,
  },
  {
    path: 'panier',
    component: CartPageComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {    
    path: 'product/:id',
    component: ProductPageComponent,
  },
  {    
    path: 'product-add',
    component: ProductAddComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
