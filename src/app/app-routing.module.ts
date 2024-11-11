import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AllCategoriesComponent } from './pages/category-control/all-categories/all-categories.component';

const routes: Routes = [
  { title: 'Home', path: '', component: HomeComponent }, 
  { title: 'Authentication', path: 'auth', component: AuthComponent }, 
  {title: "All Categories", path: "categories", component: AllCategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
