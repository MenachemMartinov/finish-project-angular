import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interface/card';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-edit-card-img',
  templateUrl: './edit-card-img.component.html',
  styleUrls: ['./edit-card-img.component.scss'],
})
export class EditCardImgComponent implements OnInit {
  uploadImages: Card = {
    bizImageDefault: [],
    bizImageWeek: [],
  };
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(private filesService: FilesService) {}

  selectFile(event: any): void {
    console.log(event.target);
    console.log(event.target.files);
    console.log(this.uploadImages);

    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        console.log(this.currentFile);

        this.filesService.NewImgUpload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        );
      }

      this.selectedFiles = undefined;
    }
  }
  ngOnInit(): void {}
}
