import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
  }

  sendVerificationEmail() {
    this.authenticationService.sendVerificationMail();
  }

  setUser() {
    return this.authenticationService.userData;
  }

}
