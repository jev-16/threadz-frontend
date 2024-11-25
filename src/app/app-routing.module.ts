import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AllCategoriesComponent } from './pages/category-control/all-categories/all-categories.component';
import { AllProductsComponent } from './pages/products-control/all-products/all-products.component';
import { AddProductComponent } from './pages/products-control/add-product/add-product.component';
import { ViewProductComponent } from './pages/products-control/view-product/view-product.component';

const routes: Routes = [
  { title: 'Home', path: '', component: HomeComponent },
  { title: 'Authentication', path: 'auth', component: AuthComponent },
  {
    title: 'All Categories',
    path: 'categories',
    component: AllCategoriesComponent,
  },
  {
    title: 'All Products',
    path: 'all-products',
    component: AllProductsComponent,
  },
  {
    title: 'Add Product',
    path: 'all-products/add',
    component: AddProductComponent,
  },
  {
    title: 'Product Details',
    path: 'all-products/view/:pId',
    component: ViewProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
