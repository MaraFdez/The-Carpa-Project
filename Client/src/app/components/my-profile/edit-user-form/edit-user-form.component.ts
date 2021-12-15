import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserData } from 'src/app/interfaces/user-data';
import { FileUpload } from 'src/app/model/file-upload.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {

  currentUser! : IUserData;
  selectedFilesImage?: FileList;
  currentFileUpload?: FileUpload;

  constructor(
    private userService : UserService,
    private router : Router,
    public angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("userDetails")!);
  }

  onSubmit() {    
    this.save();
  }
 
  save() {
    this.uploadImage();
 
    this.userService.patchUserData(this.currentUser.uid, this.currentUser).subscribe(data => {
      console.log(data);  
    });            

    window.alert("Changes successfully saved.")
    this.router.navigate(['']);
  }

  selectFileImage(event: any): void {
    this.selectedFilesImage = event.target.files;
  }

  async uploadImage() {
    if (this.selectedFilesImage) {
      const file: File | null = this.selectedFilesImage.item(0);
      this.selectedFilesImage = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        await this.userService.pushFileToStorage(this.currentFileUpload);
      }
    };
  }

}
