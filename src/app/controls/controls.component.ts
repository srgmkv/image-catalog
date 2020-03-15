import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  isRequestEmpty = false;
  @Input() isListGrouped: boolean;
  @Input() searchTag: string;
  @Input() isDataLoading: boolean;
  @Output() doSearch = new EventEmitter<string>();
  @Output() changeListGroupingStatus = new EventEmitter<boolean>();
  @Output() clearList = new EventEmitter<string>();

  constructor() {
    this.isListGrouped = false;
  }

  clearInput(): void {
    this.searchTag = '';
    this.clearList.emit();
  }

  searchByTag(): void {
    if (!this.searchTag) {
      this.isRequestEmpty = true;
    } else {
      this.isRequestEmpty = false;
      this.doSearch.emit(this.searchTag);
    }
  }

  toggleGroupingStatus(): void {
    this.isListGrouped = !this.isListGrouped;
    this.changeListGroupingStatus.emit(this.isListGrouped);
  }
}
