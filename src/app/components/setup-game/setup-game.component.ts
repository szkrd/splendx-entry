import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {gameActions} from '../../store/game/game.actions';
import {Store} from '@ngrx/store';
import {rootReducer} from '../../store/root-reducer';

@Component({
  selector: 'app-setup-game',
  templateUrl: './setup-game.component.html',
  styleUrls: ['./setup-game.component.scss']
})
export class SetupGameComponent {
  deckSize = 10;
  @Input() layout: 'vertical' | 'horizontal' = 'horizontal';
  @Input() theme: 'light' | 'dark' = 'light';

  constructor(
    private store: Store<typeof rootReducer>,
    private router: Router
  ) { }

  onDeckSizeInputChange($event) {
    this.deckSize = parseInt($event.target.value, 10);
  }

  onStartClick() {
    this.store.dispatch(gameActions.initNewGame({ deckSize: this.deckSize }));
    if (this.router.url !== '/play') {
      this.router.navigate(['/play']);
    }
  }
}
