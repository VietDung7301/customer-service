import { ProductDetailComponent } from './routes/home/order-detail/order-detail.component';
import { OrderListComponent } from './routes/home/order-list/order-list.component';
import { HelloWorldComponent } from './routes/test/helloworld.component';
import { UserComplainComponent } from './routes/complain/user-complain/complain.component';
import { HomeComponent } from './routes/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/home/dashboard/dashboard.component';
import { RateListComponent } from './routes/home/rate-list/rate-list.component';
import { ComplainListComponent } from './routes/complain/complain-list/complain-list.component';
import { ComplainDetailComponent } from './routes/complain/complain-detail/complain-detail.component';

const routes: Routes = [
  { path: 'test', component: HelloWorldComponent},
  { path: '', pathMatch: 'full', redirectTo: '/home/dashboard' },
  { path: 'home', pathMatch: 'full', redirectTo: '/home/dashboard' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'order-list', component: OrderListComponent },
      // { path: 'order-detail?orderId=1', component: ProductDetailComponent },
      { path: 'order-detail', component: ProductDetailComponent },
      { path: 'rate-list', component: RateListComponent },
      { path: 'request', component: UserComplainComponent },
      { path: 'complain-list', component: ComplainListComponent },
      { path: 'complain-detail', component: ComplainDetailComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
