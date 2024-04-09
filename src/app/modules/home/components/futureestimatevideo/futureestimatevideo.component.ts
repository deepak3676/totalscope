import { Component, ViewEncapsulation } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

interface MyMediaCard {
  videoSrc?: SafeResourceUrl
}

@Component({
  selector: 'app-future-estimate-video',
  templateUrl: './futureestimatevideo.component.html',
  styleUrls: ['./futureestimatevideo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FutureEstimateVideoComponent {
  public mediaCards: Array<MyMediaCard> = [
    {
      videoSrc: this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/kaiYwkoYtXI'
      ),
    },
  ]

  constructor(private sanitizer: DomSanitizer) {}
}
