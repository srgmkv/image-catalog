import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Image {
  id: number;
  url: SafeResourceUrl;
  searchedByTag: string;
}

interface GroupedImages {
  [key: string]: Image[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  images: Image[] = [];
  groupedImages: GroupedImages;
  isListGrouped = false;
  searchTag: string;
  errorOrNoDataMessage = '';
  showModal = false;
  isDataLoading = false;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
  }

  getImgLinkByTag(tag: string): Observable<any> {
    const key = 'zJxt2wWOiqn7YFhpxfnCq0PQZrKAzC0I';
    const params = new HttpParams()
      .set('api_key', key)
      .set('tag', tag);
    return this.http.get(`https://api.giphy.com/v1/gifs/random`, {params});
  }

  handleSearchClick(tag: string): void {
    this.isDataLoading = true;
    this.getImgLinkByTag(tag).subscribe(
      response => {
        this.isDataLoading = false;
        if (response && Array.isArray(response.data) && response.data.length === 0) {
          this.errorOrNoDataMessage = 'По тегу ничего не найдено';
          this.showModal = true;
          return;
        }
        this.updateImageList(response, tag);
        this.groupImages();
      },
      error => {
        this.isDataLoading = false;
        this.errorOrNoDataMessage = 'Произошла http ошибка';
        this.showModal = true;
      }
    );
  }

  updateImageList(response: any, tag: string): void {
    const url: string = response.data.embed_url;
    if (!url) {
      return;
    }

    const image: Image = {
      id: this.images.length + 1,
      url: this.sanitizer.bypassSecurityTrustResourceUrl(url),
      searchedByTag: tag
    };

    this.images = [...this.images, image];
  }

  toggleListGroupingStatus(): void {
    this.isListGrouped = !this.isListGrouped;
    this.groupImages();
  }

  groupImages(): void {
    this.groupedImages = this.images.reduce((groupedImages: GroupedImages, image) => {
      groupedImages[image.searchedByTag] = !groupedImages[image.searchedByTag] ? [image] :
        [...groupedImages[image.searchedByTag], image];
      return groupedImages;
    }, {});
  }

  get tagsForGrouping(): string[] {
    return Object.keys(this.groupedImages);
  }

  clearImageList(): void {
    this.images = [];
    this.isListGrouped = false;
  }

  setTag(tag: string): void {
    this.searchTag = tag;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}
