import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css'],
})
export class AllCategoriesComponent implements OnInit {
  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  categories: any;

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

  displayForm: boolean = false;
  addMode: boolean = true;
  c_id?: number;
  editValue?: string;

  openForm(id?: number, c_name?: string) {
    !id ? (this.addMode = true) : (this.addMode = false),
    (this.c_id = id),
    (this.editValue = c_name);
    console.log('ID: ', id);
    console.log('CATEGORY ID: ', this.c_id);
    console.log('CATEGORY NAME: ', this.editValue);
    
    console.log('FORM ADD MODE: ', this.addMode);
    this.displayForm = true;
  }

  /**
   * add category
   * @param data
   */
  submitCategory(data: NgForm) {
    console.log('CATEGORY FORM: ', data.value);

    this.addMode
      ? this.categoryService.addCategory(data.value).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.getCategories();
            data.resetForm();
          },
        })
      : this.categoryService.editCategory(this.c_id!, data.value).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.getCategories();
            data.resetForm();
          },
        });
  }

  /**
   * Delete category
   * @param id unique identifire for category
   * @param name name of selected category
   */
  deleteCategory(id: number, name: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete ${name}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe({
          next: (res) => {
            console.log('DELETE CATEGORY RESPONSE: ', res);
          },
          error: (error) => {
            console.log('DELETE CATEGORY ERROR: ', error);
          },
          complete: () => {
            this.getCategories();

            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
        });
      }
    });
  }
}
