import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/interface/card';

@Component({
  selector: 'app-card-id',
  templateUrl: './card-id.component.html',
  styleUrls: ['./card-id.component.scss'],
})
export class CardIdComponent implements OnInit {
  @Input() card: Card = null;
  @Input() userId: any = '';
  isTheSameUser: boolean = false;
  constructor() {

  }
  fn(){
    

    if (this.card?.user_id === this.userId) {
      this.isTheSameUser = true;
    }
  }

  ngOnInit(): void {
    this.fn();
  }
}
