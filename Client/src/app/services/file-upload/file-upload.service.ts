import { ICatalogElement } from 'src/app/interfaces/catalog-element';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Details } from 'src/app/model/details.model';
import { FileUpload } from '../../model/file-upload.model';
import { DetailsUpdateService } from '../details-update/details-update.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = '/uploads';
  elementDetails : Details = new Details('', '', '', -1);
  warehouseElements : ICatalogElement[] = [];
  warehouseItem? : ICatalogElement;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private details : DetailsUpdateService, private warehouseService : WarehouseService) { }

  
  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  pushFileToStorage(fileUpload: FileUpload) {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.elementDetails._image = downloadURL;
          
          this.saveFileData(fileUpload);    
          this.patchLastItem(this.elementDetails);

        });
      })
    ).subscribe()

  }

  private patchLastItem(details : Details): void {
    this.warehouseService.getAllCatalogElement().subscribe(data => {
      this.warehouseElements = data;    
      this.warehouseItem = this.warehouseElements[this.warehouseElements.length-1];
      this.details.updateElementDetails(this.warehouseItem.id, details).subscribe();
    });
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  getLastFile(fileUpload: FileUpload): AngularFireObject<FileUpload> {
    return this.db.object(`${this.basePath}/${fileUpload.file.name}`);
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

}
