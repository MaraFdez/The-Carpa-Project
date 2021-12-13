import { AuthenticationService } from './services/authentication/authentication.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthenticationComponent } from './components/auth-system/authentication/authentication.component';
import { WarehouseDetailComponent } from './components/warehouse-detail/warehouse-detail.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { CheckoutFailureComponent } from './components/checkout-failure/checkout-failure.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { VerifyEmailComponent } from './components/auth-system/verify-email/verify-email.component';
import { CreateAccountComponent } from './components/auth-system/create-account/create-account.component';
import { ForgotPasswordComponent } from './components/auth-system/forgot-password/forgot-password.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    WarehouseComponent,
    CheckoutComponent,
    WarehouseDetailComponent,
    CheckoutSuccessComponent,
    CheckoutFailureComponent,
    AuthenticationComponent,
    CreateAccountComponent,
    UserProfileComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
