import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PopupComponent } from 'src/app/commen/popup/popup';
import { Card } from 'src/app/interface/card';
import { CardService } from 'src/app/services/card.service';
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
  bizImageDefault?: FileList;
  bizImageWeek?: FileList;
  currentFile?: File = null;
  progress = 0;
  message = '';
  paramsId: string = '';
  constructor(
    private filesService: FilesService,
    private cardService: CardService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  selectFileForBizImageDefault(event: any): void {
    this.bizImageDefault = event.target.files;
  }

  selectFileForBizImageWeek(event: any): void {
    this.bizImageWeek = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.bizImageDefault) {
      const file: File | null = this.bizImageDefault.item(0);

      if (file) {
        this.currentFile = file;
        this.progress = 0;

        this.filesService.NewImgUpload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              let pup = this.dialog.open(PopupComponent);
              pup.afterOpened().subscribe((data) => {
                pup.componentInstance.popupUpload = this.progress;
                if (this.progress === 100) {
                  pup.close();
                }
              });
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
            if (event?.body?.status == 'you or good') {
              this.uploadImages.bizImageDefault.push(event?.body?.path);

              this.cardService
                .updateCardImg(this.paramsId, this.uploadImages)
                .subscribe((data) => {
                  let pup = this.dialog.open(PopupComponent);
                  pup.componentInstance.popupMessage = `התמונה בכרטיס ${data.bizName} העלתה בהצלחה`;
                });
            }
          },
          (err: any) => {
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
              let pup = this.dialog.open(PopupComponent);
              pup.componentInstance.popupMessage = ` ${err.error.message} `;
            } else {
              this.message = 'שגיאה הקובץ לא עלה';
              let pup = this.dialog.open(PopupComponent);
              pup.componentInstance.popupMessage = 'שגיאה הקובץ לא עלה';
            }
            this.currentFile = null;
          }
        );
      }

      this.bizImageDefault = null;
    }

    if (this.bizImageWeek) {
      const file: File | null = this.bizImageWeek.item(0);

      if (file) {
        this.currentFile = file;
        this.progress = 0;
        this.filesService.NewImgUpload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              let pup = this.dialog.open(PopupComponent);
              pup.afterOpened().subscribe((data) => {
                pup.componentInstance.popupUpload = this.progress;
                if (this.progress === 100) {
                  pup.close();
                }
              });
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
            if (event?.body?.status == 'you or good') {
              this.uploadImages.bizImageWeek.push(event?.body?.path);
              this.cardService
                .updateCardImg(this.paramsId, this.uploadImages)
                .subscribe((data) => {
                  let pup = this.dialog.open(PopupComponent);
                  pup.componentInstance.popupMessage = `התמונה בכרטיס ${data.bizName} העלתה בהצלחה`;
                });
            }
          },
          (err: any) => {
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
              let pup = this.dialog.open(PopupComponent);
              pup.componentInstance.popupMessage = ` ${err.error.message} `;
            } else {
              this.message = 'שגיאה הקובץ לא עלה';
              let pup = this.dialog.open(PopupComponent);
              pup.componentInstance.popupMessage = 'שגיאה הקובץ לא עלה';
            }
            this.currentFile = null;
          }
        );
      }

      this.bizImageWeek = null;
    }
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => (this.paramsId = params?.id));
  }
}
