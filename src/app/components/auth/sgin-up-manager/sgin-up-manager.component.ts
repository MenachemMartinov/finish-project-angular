import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sgin-up-manager',
  templateUrl: './sgin-up-manager.component.html',
  styleUrls: ['./sgin-up-manager.component.scss'],
})
export class SginUpManagerComponent implements OnInit {
  user: User = {
    manager: true,
  };
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit({ valid, value }: NgForm) {
    this.authService.signUp(valid, value).subscribe((data) => {
      if (data?._id) {
        alert(`${data.name} נרשמת בהצלחה`);

        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit(): void {}
}
