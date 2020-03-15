import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../app.component';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent {
  @Input() images: Image[];
  @Output() setTagToInput = new EventEmitter<string>();

  constructor() {
  }

  handleClick(tag: string): void {
    this.setTagToInput.emit(tag);
  }
}
