import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupComponent } from 'src/app/commen/popup/popup';
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
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) =>
      this.cardService.deleteCard(params?.id).subscribe((res) => {
        if (res?._id) {
          let pup = this.dialog.open(PopupComponent);
          pup.componentInstance.popupMessage = `${res?.bizName} נמחק בהצלחה`;
          this.router.navigate(['']);
        }
      })
    );
  }
}
