import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth-guard.service';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
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
  {path: 'authorize/sign-in', component: AuthenticationComponent},
  {path: 'authorize/sign-up', component: CreateAccountComponent},
  {path: 'authorize/sign-up/verify', component: VerifyEmailComponent},
  {path: 'myProfile/user/:id', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'upload', component: UploadFormComponent},
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'warehouse/project/:id', component: WarehouseDetailComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'checkout/success', component: CheckoutSuccessComponent},
  {path: 'checkout/failure', component: CheckoutFailureComponent},
  {path: '**', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
