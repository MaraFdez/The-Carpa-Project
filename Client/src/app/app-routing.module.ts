import { UserFormComponent } from './components/user-form/user-form.component';
import { VerifyEmailComponent } from './components/auth-system/verify-email/verify-email.component';
import { CreateAccountComponent } from './components/auth-system/create-account/create-account.component';
import { ForgotPasswordComponent } from './components/auth-system/forgot-password/forgot-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AuthenticationComponent } from './components/auth-system/authentication/authentication.component';
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
  {path: 'authorize/new-password', component: ForgotPasswordComponent},
  {path: 'myProfile/user/:id', component: UserFormComponent, canActivate: [AuthGuard]},
  //{path: 'myProfile/user/:id', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'upload', component: UploadFormComponent, canActivate: [AuthGuard]},
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
