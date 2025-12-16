import { Component, Output, EventEmitter } from "@angular/core";
@Component({
  selector: 'app-session-expired-modal',
  standalone: true,
  templateUrl:'./modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class SessionExpiredModalComponent {
  @Output() ok = new EventEmitter<void>();

  confirm(){
    this.ok.emit()
  }
}