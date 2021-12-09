import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { FileUpload } from 'src/app/model/file-upload.model';
import { IFormElement } from 'src/app/interfaces/form-element';

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

  imageUrl : string = '';

  catalogElement : IFormElement = this.newCatalogElement();

  constructor(
    private uploadService: FileUploadService,
    private storage : AngularFireStorage,
    private warehouseService : WarehouseService,
    private router : Router,
    ) { }

  ngOnInit(): void {}

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
          this.warehouseService.createCatalogElement(this.catalogElement, file).subscribe(data => {
          console.log(data);
          this.catalogElement = this.newCatalogElement();
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

  gotoList() {
    this.router.navigate(['/upload/success']);
  }

  // upload(): void {
  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     this.selectedFiles = undefined;

  //     if (file) {
  //       this.currentFileUpload = new FileUpload(file);
  //       this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
  //         percentage => {
  //           this.percentage = Math.round(percentage ? percentage : 0);
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //     }
  //   }
  // }
}

