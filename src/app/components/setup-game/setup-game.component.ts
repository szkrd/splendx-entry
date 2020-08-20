import {Component, Input} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setup-game',
  templateUrl: './setup-game.component.html',
  styleUrls: ['./setup-game.component.scss']
})
export class SetupGameComponent {
  deckSize: number = 10;

  @Input() theme: 'light' | 'dark' = 'light'

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  onDeckSizeInputChange = ($event) => {
    this.deckSize = parseInt($event.target.value, 10);
  };

  onStartClick() {
    this.gameService.initNewGame(this.deckSize);
    if (this.router.url === '/play') {
      window.location.reload();
    } else {
      this.router.navigate(['/play']);
    }
  }
}
