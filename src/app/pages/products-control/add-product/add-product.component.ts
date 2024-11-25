import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  categories: any;
  colorVariants: any = [];
  sizeVariants: any = [];
  variantCount: number = 1;
  sizeVariantCount: number = 1;

  addColorVariant() {
    const colorVariantContainer = document.getElementById(
      'colorVariantContainer'
    );

    let newElement = document.createElement('div');
    newElement.classList.add('color-set');

    newElement!.innerHTML += `
      <div>
        <label for="color${this.variantCount}">Color</label>
        <input type="text" name="color${this.variantCount}" id="color${this.variantCount}" />
      </div>
      <div>
        <label for="cost${this.variantCount}">Cost</label>
        <input type="text" name="cost${this.variantCount}" id="cost${this.variantCount}" />
      </div>
      <div>
        <label for="img${this.variantCount}">Image</label>
        <input type="file" name="img${this.variantCount}" id="img${this.variantCount}" />
      </div>
    `;

    colorVariantContainer!.appendChild(newElement);
    this.variantCount += 1;
  }

  addSizeVariant() {
    const sizeVariantContainer = document.getElementById(
      'sizeVariantContainer'
    );

    let newElement = document.createElement('div');
    newElement.classList.add('size-set');

    newElement!.innerHTML += `
      <div>
        <label for="size${this.sizeVariantCount}">Size</label>
        <input type="text" name="size${this.sizeVariantCount}" id="size${this.sizeVariantCount}" />
      </div>
      <div>
        <label for="details${this.sizeVariantCount}">Details</label>
        <input type="text" name="details${this.sizeVariantCount}" id="details${this.sizeVariantCount}" />
      </div>
      <div>
        <label for="add_cost${this.sizeVariantCount}">Additional Cost</label>
        <input type="text" name="add_cost${this.sizeVariantCount}" id="add_cost${this.sizeVariantCount}" />
      </div>
    `;

    sizeVariantContainer!.appendChild(newElement);
    this.sizeVariantCount += 1;
  }

  getColorVariants() {
    this.variantCount = 1;
    this.colorVariants = [];
    
    const variants = document.querySelectorAll('.color-set');

    for (let i = 0; i < variants.length; i++) {
      const element = variants[i];

      let col = document.getElementById(`color${i + 1}`) as HTMLInputElement;
      let cost = document.getElementById(`cost${i + 1}`) as HTMLInputElement;
      let img = document.getElementById(`img${i + 1}`) as HTMLInputElement;

      const color = col?.value || '';
      const additional_cost = cost?.value || '';
      const image: File = img.files![0];

      this.colorVariants.push({ color, additional_cost, image });
    }
  }

  getSizeVariants() {
    this.sizeVariantCount = 1;
    this.sizeVariants = [];

    const variants = document.querySelectorAll('.size-set');

    for (let i = 0; i < variants.length; i++) {
      const element = variants[i];

      let sze = document.getElementById(`size${i + 1}`) as HTMLInputElement;
      let dtls = document.getElementById(`details${i + 1}`) as HTMLInputElement;
      let cost = document.getElementById(
        `add_cost${i + 1}`
      ) as HTMLInputElement;

      const size = sze?.value || '';
      const additional_cost = cost?.value || '';
      const details = dtls.value || '';

      this.sizeVariants.push({ size, additional_cost, details });
    }
  }

  getCategories() {
    this.categoryService.allCategories().subscribe({
      next: (res) => {
        console.log('CATEGORY RESPONSE: ', res);
        this.categories = res['data']?.['categories'];
      },
      error: (error) => {
        console.log('CATEGORY ERROR: ', error);
      },
      complete: () => {},
    });
  }

  newProduct(data: NgForm) {
    this.getColorVariants();
    this.getSizeVariants();

    data.value.colorVariants = this.colorVariants;
    data.value.sizeVariants = this.sizeVariants;
    console.log('NEW PRODUCT DATA: ', data.value);

    this.productService.newProduct(data.value).subscribe({
      next: (res) => {
        console.log('NEW PRODUCT RESPONSE: ', res);
      },
      error: (error) => {
        console.log('NEW PRODUCT ERROR: ', error);
      },
      complete: () => {},
    });
  }
}
