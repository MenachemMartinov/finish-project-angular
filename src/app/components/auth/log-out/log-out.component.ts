import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    this.logout()
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['']);
  }
  ngOnInit(): void {}
}
