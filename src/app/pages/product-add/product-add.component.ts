import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {

  addProductForm : FormGroup = this.fb.nonNullable.group({
    productName: ['' , Validators.required],
    brandName: [''],
    price: ['' , Validators.required],
    category: ['' , Validators.required],
    tags: ['' , Validators.required],
    thumbnailUpload: [{ value: '', disabled: false }, Validators.required]
  })

  userId: string = '';
  previewImageFile = '';
    /** Nom du fichier chargé */
  fileName: string = '';
  /** fichier */
  file: File | null = null;
  /** Id de l'image inséré avec succès */
  insertImageID: number | null = null;

  constructor(
    private fb: FormBuilder
  ) {}

  get thumbnailUpload(): any {
    return this.addProductForm.get('thumbnailUpload');
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      console.log('Produit ajouté:', this.addProductForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }

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
    return this.thumbnailUpload.setValue('')
  }
}
