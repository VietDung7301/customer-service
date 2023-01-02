import { ProductDetailComponent } from './routes/home/product-detail/product-detail.component';
import { ProductListComponent } from './routes/home/product-list/product-list.component';
import { HomeComponent } from './routes/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/home/dashboard/dashboard.component';
import { RateListComponent } from './routes/home/rate-list/rate-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/dashboard' },
  { path: 'home', pathMatch: 'full', redirectTo: '/home/dashboard' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-detail', component: ProductDetailComponent },
      { path: 'rate-list', component: RateListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
