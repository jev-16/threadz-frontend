import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ApiLink } from 'src/app/shared/models/api-link';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.pId = param['pId'];
    });

    this.getProduct(this.pId!);
    console.log('Base URL: ', this.baseUrl);
  }

  pId?: number;
  product: any;
  baseUrl: any = new ApiLink();
  currColor?: number;
  currSize?: number;
  additionalColorCost?: any;
  additionalSizeCost?: any;

  setCurrColor(cId: number, additional_cost: number) {
    this.currColor = cId;
    this.additionalColorCost = additional_cost;
  }

  setCurrSize(sId: number, additional_cost: number) {
    this.currSize = sId;
    this.additionalSizeCost = additional_cost;
  }

  getProduct(id: number) {
    this.productService.oneProduct(id).subscribe({
      next: (res) => {
        this.product = res['data']!['product'];
        console.log('PRODUCT: ', this.product);
      },
      error: (error) => {
        console.log('ONE PRODUCT ERROR: ', error.error);
      },
      complete: () => {
        this.product.colors.length > 0
          ? (this.currColor = this.product.colors[0].id) &&
            (this.additionalColorCost = this.product.colors[0].additional_cost)
          : (this.currColor = undefined);
        this.product.sizes.length > 0
          ? (this.currSize = this.product.sizes[0].id) &&
            (this.additionalSizeCost = this.product.sizes[0].additional_cost)
          : (this.currSize = undefined);
      },
    });
  }

  get productTotalCost() {
    return (
      parseFloat(this.product?.price) +
      parseFloat(this.additionalColorCost!) +
      parseFloat(this.additionalSizeCost!)
    );
  }
}
