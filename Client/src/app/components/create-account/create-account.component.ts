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
  
  constructor(
    private authenticationService : AuthenticationService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  async signUp() {
    await this.authenticationService.signUp(this.email, this.password).then(output => {
      if(output == true) {
          this.router.navigate(['']);
      }
    });
    this.email = '';
    this.password = '';
  }

}
