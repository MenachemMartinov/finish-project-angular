import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {};
  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit({ valid, value }: NgForm) {
    await this.authService
      .logIn(valid, value)
      .subscribe((data) => {
        if (data?.user?._id){
          this.authService.addToken(data?.token)
          alert(`${data.user?.name} ברוך הבא`)
          this.router.navigate(['']);
        }
      });



  }
  ngOnInit(): void {}
}
