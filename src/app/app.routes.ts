import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full',
  },
  {
    path: 'accueil',
    loadComponent: () =>
      import('@pages/home/home.component').then(
        (m) => m.HomeComponent),
  },
  {
    path: 'connexion',
    loadComponent: () =>
      import('@pages/login/login.component').then(
        (m) => m.LoginComponent),
  },
  {
    path: 'inscription',
    loadComponent: () =>
      import('@pages/registration/registration.component').then(
        (m) => m.RegistrationComponent
      ),
  },
  {
    path: 'panier',
    loadComponent: () =>
      import('@pages/product-page/product-page.component').then(
        (m) => m.ProductPageComponent
      ),
  },
  {
    path: 'profil',
    loadComponent: () =>
      import('@pages/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
  },
  {
    path: 'product-add',
    loadComponent: () =>
      import('@pages/product-add/product-add.component').then(
        (m) => m.ProductAddComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
