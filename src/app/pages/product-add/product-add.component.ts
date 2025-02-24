import { NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ProductService } from '@features/product/services/product.service';
import { ModalService } from '@shared/components/modal/modal.service';
import { RouterLink } from '@angular/router';
import { ICategory, ICriterias, IProduct } from '@features/product/interfaces/product';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, RouterLink],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent implements OnInit{


    @ViewChild('viewRef', { static: true, read: ViewContainerRef })
    vcr!: ViewContainerRef;
  

  addProductForm : FormGroup = this.fb.nonNullable.group({
    title: ['' , Validators.required],
    description: ['' , Validators.required],
    brands: [''],
    price: ['' , Validators.required],
    category: ['' , Validators.required],
    reduction: null,
    tags: this.fb.array([]),
    imgs_url: [{ value: '', disabled: false }, Validators.required]
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
    private productService: ProductService,
    private modalService : ModalService
  ) {}

  get imgs_url(): any {
    return this.addProductForm.get('imgs_url');
  }


  get tags() {
    return this.addProductForm.controls["tags"] as FormArray;
  }

  ngOnInit(): void {
    this.productService.getAllCriterias().subscribe({
      next: (data: ICriterias) => {
        this.categoriesList = data.categories.map((e: ICategory) => ({
          label: e.title,
          slug: e.slug
        }));
      },
      error: (err) => {
        console.error('Error fetching getProductShearchedGoodDealst:', err);
      }
      })
  }

  onSubmit(viewHtml:TemplateRef<Element> ) {
    if (this.addProductForm.valid) {
        this.productService.addProduct(this.addProductForm.value).subscribe({
          next:(data: IProduct) => {
            if (data){
              this.openModalTemplate(viewHtml);
              this.addProductForm.reset();
            } 
          },
          error:(error) => {
            console.log('Error ', error);
            
          }
        })

    } else {
      console.error('Formulaire invalide');
    }
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

  public cleanImgsUrl(){
    this.previewImageFile = '';
    return this.imgs_url.setValue('')
  }

  public cleanForm(){
    this.addProductForm.reset();
    this.cleanImgsUrl()  
  }


  public openModalTemplate(view: TemplateRef<Element>) {
    this.modalService.open(this.vcr, view, {
      animations: {
        modal: {
          enter: 'enter-slide-down 0.8s',
        },
        overlay: {
          enter: 'fade-in 0.8s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '40rem',
      },
    });
  }
}
