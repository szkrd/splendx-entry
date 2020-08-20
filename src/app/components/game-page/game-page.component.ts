import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {trigger, style, animate, transition} from '@angular/animations';
import {Subscription} from 'rxjs';

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
  currentTries = 0;
  best = 0;
  cards: ICard[] = [];
  uiLocked = false;
  showSuccessMessage = false;
  newGameSubscription: Subscription;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.syncState();
    this.newGameSubscription = this.gameService.newGameInitialized.subscribe(this.onNewGameInitialized);
  }

  ngOnDestroy() {
    this.newGameSubscription.unsubscribe();
  }

  onNewGameInitialized = () => {
    this.showSuccessMessage = false;
    this.syncState();
  }

  syncState() {
    const { state } = this.gameService;
    this.currentTries = state.tries;
    this.best = this.gameService.best;
    const localCards = this.cards.map(card => card.id).sort().join(',');
    const stateCards = state.cards.map(id => id).sort().join(',');
    if (localCards !== stateCards) {
      this.cards = state.cards.map(id => ({ id, visible: false }));
    }
  }

  onRestartClick() {
    this.showSuccessMessage = false;
    this.gameService.initNewGame();
    this.cards = [];
    this.syncState();
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
      this.gameService.increaseTryCount();
    }
    if (matching) {
      this.cards = this.cards.filter(item => item.id !== card.id);
      this.gameService.removeCard(card.id);
      if (finished) {
        this.showSuccessMessage = true;
        this.gameService.saveHighScore();
      }
    }
    if (!matching && otherVisibleCard) {
      this.uiLocked = true;
      setTimeout(() => { // temporarily leave both cards visible
        this.uiLocked = false;
        otherVisibleCard.visible = false;
        card.visible = false;
      }, this.gameService.REVEAL_TIMEOUT);
    }
    this.syncState();
  }
}
