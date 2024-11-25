import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  products: any;
  categories: any;
  category?: string;

  onPageChange(page: number) {
    this.currPage = page;
    this.getProducts();
  }
  // pagination
  currPage: number = 1;
  totalItems?: number;
  limit: number = 5;

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  pageLimits: any = [
    { name: '5 items per page', value: 5 },
    { name: '10 items per page', value: 10 },
    { name: '20 items per page', value: 20 },
    { name: '25 items per page', value: 25 },
    { name: '50 items per page', value: 50 },
    { name: '100 items per page', value: 100 },
  ];

  /**
   * get all products
   */
  getProducts() {
    this.productService.getProducts(this.currPage, this.limit).subscribe({
      next: (res) => {
        console.log('ALL PRODUCTS: ', res);
        this.products = res['data']!['products'];
        this.totalItems = parseInt(res['data']!['productCount']);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
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

  getProductByCategory(category: string) {
    !category
      ? this.getProducts()
      : this.productService.allProductCategory(category).subscribe({
          next: (res) => {
            console.log('PRODUCTS BY CATEGORY: ', res);
            this.products = res['data']!['products'];
            this.totalItems = parseInt(res['data']!['productCount']);
          },
          error: (error) => {
            console.log('PRODUCTS BY CATEGORY ERROR: ', error);
          },
          complete: () => {},
        });
  }

  deleteProduct(id: number, name: string) {
    console.log(id, name);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete ' + name,
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe({
            next: (res) => {},
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! ' + error.error.message,
                // footer: '<a href="#">Why do I have this issue?</a>',
              });
            },
            complete: () => {
              this.getProducts();
              swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
            },
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            icon: 'error',
          });
        }
      });
  }
}
