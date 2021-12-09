import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { FileUpload } from 'src/app/model/file-upload.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUpload!: FileUpload;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}

