import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { PopupComponent } from 'src/app/commen/popup/popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {};
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  async onSubmit({ valid, value }: NgForm) {
    await this.authService.logIn(valid, value).subscribe(
      (data) => {
        if (data?.user?._id) {
          this.authService.addToken(data?.token);
          let pup = this.dialog.open(PopupComponent);
          pup.componentInstance.popupMessage = `${data.user?.name} ברוך הבא`;
          this.router.navigate(['']);
        }
      },
      (err) => {
        if (err?.error === 'User is not found') {
          let pup = this.dialog.open(PopupComponent);
          pup.componentInstance.popupMessage = `המשתמש לא קיים`;
        } else if (err?.error === 'Invalid email or password') {
          let pup = this.dialog.open(PopupComponent);
          pup.componentInstance.popupMessage = `הסיסמה או האימייל לא תקינים`;
        } else {
          let pup = this.dialog.open(PopupComponent);
          pup.componentInstance.popupMessage = `שגיאה לא ידועה`;
        }
      }
    );
  }
  ngOnInit(): void {}
}
