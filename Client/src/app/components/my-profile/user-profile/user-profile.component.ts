import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from '../../../services/user/user.service';
import { IUserData } from 'src/app/interfaces/user-data';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData! : IUserData;
  username : string = '';

  constructor(
    private userService : UserService,
    private authenticationService : AuthenticationService,
    private router : Router,
    private route : ActivatedRoute,
    private location : Location
  )
  { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() : void {
    this.username = this.route.snapshot.params['username'];
    this.userService.getUserDataByUsername(this.username).subscribe(data => {
      let userDetails : IUserData = {
        id : data.id,
        uid : data.uid,
        username : data.username,
        profileImage : data.profileImage,
        aboutMe : data.aboutMe,
        uploadedProjects : data.uploadedProjects
      }
      this.userData = userDetails;
    });
  }

  goBack() : void {
    this.location.back();
  }

  setUser() {
    return this.authenticationService.userData;
  }

}
