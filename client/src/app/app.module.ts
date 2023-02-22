import { DrawerFormBaseComponent } from './components/drawer-form-base/drawer-form-base.component';
import { ProductDetailComponent } from './routes/home/order-detail/order-detail.component';
import { OrderListComponent } from './routes/home/order-list/order-list.component';
import { HelloWorldComponent } from './routes/test/helloworld.component';
import { UserComplainComponent } from './routes/complain/user-complain/complain.component';
import { HomeComponent } from './routes/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { DashboardComponent } from './routes/home/dashboard/dashboard.component';
import { RateListComponent } from './routes/home/rate-list/rate-list.component';
import { RateDetailDrawerComponent } from './routes/home/rate-list/partials/rate-detail-drawer/rate-detail-drawer.component';
import { ComplainListComponent } from './routes/complain/complain-list/complain-list.component';
import { ComplainDetailComponent } from './routes/complain/complain-detail/complain-detail.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    OrderListComponent,
    HelloWorldComponent,
    UserComplainComponent,
    ProductDetailComponent,
    DrawerFormBaseComponent,
    RateListComponent,
    RateDetailDrawerComponent,
    ComplainListComponent,
    ComplainDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
