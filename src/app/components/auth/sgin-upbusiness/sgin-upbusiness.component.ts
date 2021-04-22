import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit({ valid, value }: NgForm) {
    console.log(value);

    this.authService
      .signUp(valid, value)
      .subscribe((data) => {
        if (data?._id){
          alert(`${data.name} נרשמת בהצלחה`)
          this.router.navigate(['/login']);
        }
      });

  }
  ngOnInit(): void {}
}
