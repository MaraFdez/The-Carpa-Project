import { UserService } from './../../services/user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { FileUpload } from 'src/app/model/file-upload.model';
import { IFormElement } from 'src/app/interfaces/form-element';
import { User } from 'src/app/interfaces/user';
import { IUserData } from 'src/app/interfaces/user-data';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  fileUploads?: any[];

  selectedFiles?: FileList;
  selectedFilesImage?: FileList;
  currentFileUpload?: FileUpload;
  currentFile: File | null = null;

  currentUser! : IUserData;

  catalogElement : IFormElement = this.newCatalogElement();

  constructor(
    private uploadService: FileUploadService,
    private warehouseService : WarehouseService
    ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("userDetails")!);

  }

  private newCatalogElement() : IFormElement {
    return  {
      username : "",
      projectName : "",
      description : "",
      image: "",
      price: 0
    }
  }

  onSubmit(): void {    
   this.save();
  }

  save() {
    this.uploadImage();

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
          // Save the element in the database
          this.catalogElement.username = this.currentUser.username;
          this.warehouseService.createCatalogElement(this.catalogElement, file).subscribe(data => {
          console.log(data);
          this.catalogElement = this.newCatalogElement();
          window.location.reload();
        },
        error => console.log(error),
        () => console.log('Catalog element stored'))
      }
    }
  }

  

  selectFileImage(event: any): void {
    this.selectedFilesImage = event.target.files;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadImage() {
    if (this.selectedFilesImage) {
      const file: File | null = this.selectedFilesImage.item(0);
      this.selectedFilesImage = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload);
      }
    };
  }

}

