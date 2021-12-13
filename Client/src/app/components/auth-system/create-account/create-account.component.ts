import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage : boolean = true;
  
  constructor(
    private authenticationService : AuthenticationService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  async signUp() {
    await this.authenticationService.signUp(this.email, this.password).then(output => {
      this.errorMessage = output;
      if(output == true) {
          this.router.navigate(['/authorize/sign-up/verify']);
          window.scrollTo(0, 0);
      }
    });
    this.email = '';
    this.password = '';
  }

}
