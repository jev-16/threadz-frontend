import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/models/api-response';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}
  private api_url: string = 'http://localhost:3000/api_v1/products';

  /**
   * Get all products
   * @param page current page of results needed for pagination
   * @param limit maximum amount of items to be retrieved at a time
   * @returns Response from API
   */
  getProducts(page?: number, limit?: number): Observable<ApiResponse> {
    return this._http
      .get<ApiResponse>(
        `${this.api_url}${page && limit ? `?page=${page}&limit=${limit}` : ''}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get a single product
   * @param id Unique identifier for product
   * @returns Response from API
   */
  oneProduct(id: number): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(`${this.api_url}/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * get all product by category
   * @param category category of products to be retrieved
   * @param page current page of results being shown (for pagination)
   * @param limit maximum amount of results to be shown per page (for pagination)
   * @returns Response from the API
   */
  allProductCategory(
    category: string,
    page?: number,
    limit?: number
  ): Observable<ApiResponse> {
    return this._http
      .get<ApiResponse>(
        `${this.api_url}/category?category=${category}${
          page && limit ? `&page=${page}&limit=${limit}` : ''
        }`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  // add new product
  newProduct(product: any): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('prod_nme', product.prod_nme);
    formData.append('prod_desc', product.prod_desc);
    formData.append('prod_price', product.prod_price);
    formData.append('cat_id', product.cat_id);
    formData.append('qty', product.qty);

    // loop through color variants to add items to formData
    const colorVariants: any = [];
    const sizeVariants: any = [];
    product.colorVariants.forEach((e: any) => {
      colorVariants.push({
        color: e.color,
        additional_cost: e.additional_cost,
      });

      formData.append('files', e.image);
    });
    product.sizeVariants.forEach((e: any) => {
      sizeVariants.push({
        size: e.size,
        additional_cost: e.additional_cost,
        details: e.details,
      });
    });
    formData.append('colorVariants', JSON.stringify(colorVariants));
    formData.append('sizeVariants', JSON.stringify(sizeVariants));
    console.log('FORM DATA =========: ', formData);

    // formData.append('file', product.file);

    return this._http.post<ApiResponse>(this.api_url, formData).pipe(
      map((res) => {
        return res;
      })
    );
  }
  // edit existing product

  /**
   * delete a product
   * @param id Unique identifier for product to be deleted
   * @returns Response from the API
   */
  deleteProduct(id: number): Observable<ApiResponse> {
    return this._http.delete<ApiResponse>(`${this.api_url}/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
