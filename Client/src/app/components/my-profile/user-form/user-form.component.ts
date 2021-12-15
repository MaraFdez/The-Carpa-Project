import firebase from 'firebase/app';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FileUpload } from 'src/app/model/file-upload.model';
import { UserService } from '../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { IUserData } from 'src/app/interfaces/user-data';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  newUser : IUserData = this.newUserData();
  selectedFilesImage?: FileList;
  currentFileUpload?: FileUpload;

  constructor(
    private userService : UserService,
    private router : Router,
    private authenticationService : AuthenticationService,
    public angularFireAuth: AngularFireAuth,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  private newUserData() : IUserData {
    return  {
      id : 0,
      uid : "",
      username : "",
      profileImage: "",
      aboutMe : "",
      uploadedProjects: 0
    }
  }

  onSubmit() {    
    this.save();
    this.goToHomePage();
  }
 
  save() {
    this.uploadImage();
 
    this.angularFireAuth.authState.subscribe(user => {
        this.newUser.uid = user!.uid;
        this.userService.saveUserData(this.newUser).subscribe(data => {
            console.log(data);  
            const user = firebase.auth().currentUser;
            user!.updateProfile({
              displayName: data.username
            })
        });
    });            

  }

  goToHomePage() {
    this.router.navigate(['']);
    window.scrollTo(0, 0);
  }

  selectFileImage(event: any): void {
    this.selectedFilesImage = event.target.files;
  }

  uploadImage() {
    if (this.selectedFilesImage) {
      const file: File | null = this.selectedFilesImage.item(0);
      this.selectedFilesImage = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.userService.pushFileToStorage(this.currentFileUpload);
      }
    };
  }
}
