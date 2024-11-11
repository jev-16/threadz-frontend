import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../shared/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _http: HttpClient) {}

  private api_url: string = 'http://localhost:3000/api_v1/categories';

  /**
   * get all categories
   * @param page current page of data
   * @param limit max amount of data to be retrieved
   * @returns response from api
   */
  allCategories(page?: number, limit?: number): Observable<ApiResponse> {
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
   * Get a single Category
   * @param id unique identifier for category item to be retrieved
   * @returns Response from API
   */
  oneCategory(id: number): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(`${this.api_url}/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * Add new category
   * @param data Object containing category information
   * @returns Response from API
   */
  addCategory(data: any): Observable<ApiResponse> {
    return this._http.post<ApiResponse>(this.api_url, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * Edit an existing category
   * @param id Unique identifier for category
   * @param data object containing new information for category
   * @returns Response from API
   */
  editCategory(id: number, data: any): Observable<ApiResponse> {
    return this._http.patch<ApiResponse>(`${this.api_url}/${id}`, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteCategory(id: number): Observable<ApiResponse> {
    return this._http.delete<ApiResponse>(`${this.api_url}/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
