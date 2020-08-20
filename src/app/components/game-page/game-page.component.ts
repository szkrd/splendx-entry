import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {rootReducer} from '../../store/root-reducer';
import {gameActions} from '../../store/game/game.actions';

interface ICard {
  id: number;
  visible: boolean;
}

const cardAnimStyle = [style({ opacity: 0, top: 30 }), style({ opacity: 1, top: 0 })];

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [cardAnimStyle[0], animate('.2s ease-out', cardAnimStyle[1])]),
      transition(':leave', [cardAnimStyle[1], animate('.2s ease-in', cardAnimStyle[0])])
    ])
  ]
})
export class GamePageComponent implements OnInit, OnDestroy {
  REVEAL_TIMEOUT = 1000;
  currentTries = 0;
  best = 0;
  cards: ICard[] = [];
  uiLocked = false;
  showSuccessMessage = false;
  newGameSubscription: Subscription;
  gameStateSubscription: Subscription;
  revealDoneTimeout: number;

  constructor(
    private store: Store<typeof rootReducer>
    // private gameService: GameService
  ) {
    // this.store.dispatch(gameActions.initNewGame({ deckSize: 3 }))
    // this.currentTries$ = store.pipe(select([ 'game', 'tries' ]));
    this.gameStateSubscription = store.select('game').subscribe(data => this.syncState(data));
  }

  ngOnInit() {
    // this.syncState();
    // this.newGameSubscription = this.gameService.newGameInitialized.subscribe(this.onNewGameInitialized);
  }

  ngOnDestroy() {
    // this.newGameSubscription.unsubscribe();
    this.gameStateSubscription.unsubscribe();
    if (this.revealDoneTimeout) {
      clearTimeout(this.revealDoneTimeout);
    }
  }

  // onNewGameInitialized = () => {
  //   this.showSuccessMessage = false;
  //   this.syncState();
  // }

  syncState = (state) => {
    this.currentTries = state.tries;
    this.best = state.best;
    const localCards = this.cards.map(card => card.id).sort().join(',');
    const stateCards = state.cards.map(id => id).sort().join(',');
    if (localCards !== stateCards) {
      this.cards = state.cards.map(id => ({ id, visible: false }));
    }
  }

  onRestartClick() {
    this.showSuccessMessage = false;
    this.store.dispatch(gameActions.initNewGame({}));
    this.cards = [];
  }

  onCardClick(card: ICard) {
    if (this.uiLocked) {
      return;
    }
    const otherVisibleCard = this.cards.find(item => item.visible);
    card.visible = true;
    const matching = otherVisibleCard && otherVisibleCard.id === card.id;
    const finished = matching && this.cards.length === 2;
    if (otherVisibleCard) {
      this.store.dispatch(gameActions.increaseTryCount());
    }
    if (matching) {
      this.cards = this.cards.filter(item => item.id !== card.id);
      this.store.dispatch(gameActions.removeCard({ id: card.id }));
      if (finished) {
        this.showSuccessMessage = true;
        this.store.dispatch(gameActions.saveHighScore());
      }
    }
    if (!matching && otherVisibleCard) {
      this.uiLocked = true;
      this.revealDoneTimeout = setTimeout(() => { // temporarily leave both cards visible
        this.revealDoneTimeout = 0;
        this.uiLocked = false;
        otherVisibleCard.visible = false;
        card.visible = false;
      }, this.REVEAL_TIMEOUT);
    }
  }
}
