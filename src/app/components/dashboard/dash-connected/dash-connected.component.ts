import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dash-Connected',
  templateUrl: './dash-Connected.component.html',
  styleUrls: ['./dash-Connected.component.scss'],
})
export class DashConnectedComponent implements OnInit {
  // to do ngIf if user is exist
  userLogged: User = null;
  token: string = 'token';

  constructor(private auth: AuthService, location: Location) {
    location.onUrlChange(() => this.ifUserLogged());
  }
  // check if user is logged by token
  ifUserLogged = () => {
    this.auth.getCurrentUser$.subscribe((user) => (this.userLogged = user));
  };

  ngOnInit(): void {}
}
