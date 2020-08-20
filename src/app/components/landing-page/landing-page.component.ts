import { Component } from '@angular/core';
import {GameService} from '../../services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  deckSize: number = 10;

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  onDeckSizeInputChange = ($event) => {
    this.deckSize = parseInt($event.target.value, 10);
  }

  onStartClick() {
    this.gameService.setDeckSize(this.deckSize);
    this.router.navigate([ '/play' ]);
  }
}
