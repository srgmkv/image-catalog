import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() show = false;
  @Input() customClass = '';
  @Output() closeModal = new EventEmitter<any>();

  constructor() {
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
