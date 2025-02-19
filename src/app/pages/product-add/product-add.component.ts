import { NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ProductService } from '@features/product/services/product.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe , ButtonComponent],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent implements OnInit{

  addProductForm : FormGroup = this.fb.nonNullable.group({
    productName: ['' , Validators.required],
    description: ['' , Validators.required],
    brandName: [''],
    price: ['' , Validators.required],
    category: ['' , Validators.required],
    tags: this.fb.array([]),
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

  console = console;
  categoriesList: any[] = [];

  @ViewChild('valueTags') valueTags!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  get thumbnailUpload(): any {
    return this.addProductForm.get('thumbnailUpload');
  }

  ngOnInit(): void {
    this.productService.getAllCriterias().subscribe({
      next: (data: any) => {
        this.categoriesList = data.categories.map((e:any) => ({
          label: e.label,
          slug: e.slug
        }));
      },
      error: (err) => {
        console.error('Error fetching getProductShearchedGoodDealst:', err);
      }
      })
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      console.log('Produit ajouté:', this.addProductForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }

  get tags() {
    return this.addProductForm.controls["tags"] as FormArray;
  }


  addTags(valueTags: string): void {
    
    if (valueTags) {
      valueTags.split(',').forEach(tag => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !this.tags.value.includes(trimmedTag)) {
          this.tags.push(new FormControl(trimmedTag));
        }
      });

      this.valueTags.nativeElement.value = '';
    }
  }
  deleteTags(lessonIndex: number) {
    this.tags.removeAt(lessonIndex);
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
