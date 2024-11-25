import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() totalItems?: number;
  @Input() limit: number = 10;
  @Input() currPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems! / this.limit);
  }

  
  get pages(): number[] {
    // console.log("TOTAL PAGES: ", this.totalPages)
    const pages: any[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
       
    }
    return pages;
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currPage = page;
    this.pageChange.emit(this.currPage);
  }

  previousPage(): void {
    if (this.currPage > 1) {
      this.onPageChange(this.currPage - 1);
    }
  }

  nextPage(): void {
    if (this.currPage < this.totalPages) {
      this.onPageChange(this.currPage + 1);
    }
  }
}
