import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/commen/popup/popup';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sgin-upbusiness',
  templateUrl: './sgin-upbusiness.component.html',
  styleUrls: ['./sgin-upbusiness.component.scss'],
})
export class SginUpbusinessComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    business: true,
  };
  constructor(private authService: AuthService, private router: Router,private dialog: MatDialog) {}

  onSubmit({ valid, value }: NgForm) {

    this.authService
      .signUp(valid, value)
      .subscribe((data) => {
        if (data?._id){

        let pup = this.dialog.open(PopupComponent);
        pup.componentInstance.popupMessage = `${data.name} נרשמת בהצלחה`;
          this.router.navigate(['/login']);
        }
      });

  }
  ngOnInit(): void {}
}
