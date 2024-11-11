import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

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
}
