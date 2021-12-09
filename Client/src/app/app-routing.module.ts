//import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CheckoutFailureComponent } from './components/checkout-failure/checkout-failure.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { WarehouseDetailComponent } from './components/warehouse-detail/warehouse-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  //{path: 'authorize', component: AuthenticationComponent},
  {path: 'upload', component: UploadFormComponent},
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'warehouse/project/:id', component: WarehouseDetailComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'checkout/success', component: CheckoutSuccessComponent},
  {path: 'checkout/failure', component: CheckoutFailureComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
