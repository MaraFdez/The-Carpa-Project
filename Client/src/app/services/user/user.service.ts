import { AngularFireAuth } from '@angular/fire/auth';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../../model/file-upload.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { IUserData } from 'src/app/interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8000/user';
  private basePath = '/uploads';

  private userData : IUserData = {
    uid : '',
    username : '',
    profileImage : '',
    aboutMe : ''
  };

  constructor(
    private http: HttpClient, 
    private db: AngularFireDatabase, 
    private storage: AngularFireStorage,
    private angularFireAuth : AngularFireAuth
  ) { }

  // User Microservice

  getAllUsers(): Observable<IUserData[]> {
    return this.http.get<IUserData[]>(`${this.baseUrl}`)
  }
  
  getUserData(id: string): Observable<IUserData> {
    return this.http.get<IUserData>(`${this.baseUrl}/${id}`);
  }

  getUserDataByUsername(username : string): Observable<IUserData> {
    return this.http.get<IUserData>(`${this.baseUrl}/username/${username}`);
  }

  saveUserData(user : IUserData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  patchUserData(uid : string, user : IUserData) : Observable<any> {
    return this.http.patch(`${this.baseUrl}/${uid}`, user);
  }

  // Firebase Storage

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
          this.userData.profileImage = downloadURL;
          
          this.saveFileData(fileUpload);
          
          this.angularFireAuth.authState.subscribe(user => {
            this.patchUserData(user!.uid, this.userData).subscribe();  
          })

        });
      })
    ).subscribe()
  }

}