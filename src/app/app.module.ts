import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/partials/header/header.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AllCategoriesComponent } from './pages/category-control/all-categories/all-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AllProductsComponent } from './pages/products-control/all-products/all-products.component';
import { AddProductComponent } from './pages/products-control/add-product/add-product.component';
import { PaginationComponent } from './pages/partials/pagination/pagination.component';
import { ViewProductComponent } from './pages/products-control/view-product/view-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AuthComponent,
    AllCategoriesComponent,
    AllProductsComponent,
    AddProductComponent,
    PaginationComponent,
    ViewProductComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
