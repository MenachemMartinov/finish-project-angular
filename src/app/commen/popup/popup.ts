import { Component, Input } from '@angular/core';
@Component({
  selector: 'popup-me',
  templateUrl: 'popup.html',
  styleUrls: ['popup.scss'],

})
export class PopupComponent {
  @Input() popupMessage?: string = '';
  @Input() popupUpload?: number = null;
}
