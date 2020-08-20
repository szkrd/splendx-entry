import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  imageSrc = '';
  emptySrc = '';
  @Input() imageId = 0;
  @Input() visible = false;
  @Input() showNumbers = false; // debug

  ngOnInit(): void {
    this.imageSrc = this.getImageSrc(this.imageId + 1);
    this.emptySrc = this.getImageSrc(0);
  }

  private getImageSrc(id = 0) {
    return 'url("/assets/cards/' + (id < 10 ? `0${id}` : String(id)) + '.png")';
  }
}
