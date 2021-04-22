import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss'],
})
export class DeleteCardComponent implements OnInit {
  constructor(
    private cardService: CardService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) =>
      this.cardService.deleteCard(params?.id).subscribe((res) => {
        if (res?._id) {
          alert(`${res?.bizName} נמחק בהצלחה`);
          this.router.navigate(['']);
        }
      })
    );
  }
}
