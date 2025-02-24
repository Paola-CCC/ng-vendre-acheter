import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TokenStorageService } from '@shared/services/token/token-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass ,ReactiveFormsModule, CommonModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  loginForm = this.fb.group({
    email: ['' , Validators.required],
    password: ['' , Validators.required],
  })
  /** indique si le formulaire a été envoyé ou non  */
  submitted : boolean = false;
  /** indique si s'inscription a réussi ou non  */
  signUpIsSuccessful = false;
  errorMessage = '';

  previewImageFile = '';
  /** Nom du fichier chargé */
  fileName: string = '';
  /** fichier */
  file: File | null = null;
  /** Id de l'image inséré avec succès */
  insertImageID: number | null= null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storage: TokenStorageService,
    private router: Router,
    ) {}


  get email (): any {
    return this.loginForm.get('email') ;
  }

  get password (): any {
    return this.loginForm.get('password');
  }

  get loginFormControls() : { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }


  ngOnInit(): void {}
  

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }

  onSubmit(){

    this.submitted = true;

    if (this.loginForm.invalid) {
      this.authService.loginUser(this.email.value, this.password.value).subscribe({
        next:(data: any) => {
          console.log('data ',data)

          const userDatas = {
            userInfos: {
              name:'tata'
            },
            token: 'LLL'
          }

          this.authService.saveUserInfo(userDatas.userInfos, userDatas.token);
        },
        error:(error) => {
          console.error(error)
        }
      })
      this.router.navigate(['/']);
    }
  }
  
}