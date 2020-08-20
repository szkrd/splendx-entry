import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {trigger, style, animate, transition} from '@angular/animations';

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
export class GamePageComponent implements OnInit {
  currentTries = 0;
  best: 0;
  cards: ICard[] = [];
  private uiLocked = false;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    const { state } = this.gameService;
    this.currentTries = state.tries;
    this.cards = state.cards.map(id => ({ id, visible: false }));
  }

  onCardClick(card: ICard) {
    if (this.uiLocked) {
      return;
    }
    const otherVisibleCard = this.cards.find(item => item.visible);
    card.visible = true;
    const matching = otherVisibleCard && otherVisibleCard.id === card.id;
    if (matching) {
      this.cards = this.cards.filter(item => item.id !== card.id);
      return;
    }
    if (otherVisibleCard) {
      this.uiLocked = true;
      setTimeout(() => {
        this.uiLocked = false;
        otherVisibleCard.visible = false;
        card.visible = false;
      }, this.gameService.REVEAL_TIMEOUT);
    }
  }
}
