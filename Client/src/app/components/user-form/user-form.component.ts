import { AngularFireAuth } from '@angular/fire/auth';
import { FileUpload } from 'src/app/model/file-upload.model';
import { UserService } from './../../services/user/user.service';
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
    public angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  private newUserData() : IUserData {
    return  {
      uid : "",
      username : "",
      profileImage: "",
      aboutMe : ""
    }
  }

  onSubmit(): void {    
    this.save();
  }
 
  save() {
    this.uploadImage();
 
    this.angularFireAuth.authState.subscribe(user => {
        this.newUser.uid = user!.uid;
        this.userService.saveUserData(this.newUser).subscribe(data => {
            console.log(data);
            this.newUser= this.newUserData();
        });
    });
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
