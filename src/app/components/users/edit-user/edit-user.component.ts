import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/commen/popup/popup';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  user: User = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onSubmit({ valid, value }: NgForm) {
    this.authService.updateUser(valid, value).subscribe((data) => {
      if (data?._id) {
        let pup = this.dialog.open(PopupComponent);
        pup.componentInstance.popupMessage = `${data.name} הפרטים עדכנו בהצלחה`;
      }
    });
  }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe((data) => (this.user = data));
    console.log(this.user);
  }
}
