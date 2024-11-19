import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TokenStorageService } from '@shared/services/token/token-storage.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [NgClass ,ReactiveFormsModule, CommonModule , RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registerForm = this.fb.group({
    username: ['' , Validators.required],
    email: ['' , Validators.required],
    password: ['' , Validators.required],
    profilePicture: ['' , Validators.required],

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

  get username (): any {
    return this.registerForm.get('username') ;
  }

  get email (): any {
    return this.registerForm.get('email') ;
  }

  get password (): any {
    return this.registerForm.get('password');
  }

  get profilePicture (): any {
    return this.registerForm.get('profilePicture');
  }

  get controlRegister() : { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }


  ngOnInit(): void {}
  

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.fileName = this.file.name;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewImageFile = e.target.result;
      };

      reader.readAsDataURL(this.file);
    }
  }

  public cleanThumbnailUpload(){
    this.previewImageFile = '';
    return this.profilePicture.setValue('')
  }
  
  setDefaultValue() { 
    // this.registerForm.setValue({
    //   username:'',
    //   email: '',
    //   password: ''
    // });
  }
  

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }




  onSubmit(){

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }


  }
  
}
