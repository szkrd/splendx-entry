import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service';

interface ICard {
  id: number;
  visible: boolean;
}

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  currentTries = 0;
  best: 0;
  cards: ICard[] = [];

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    const { state } = this.gameService;
    this.currentTries = state.tries;
    this.cards = state.cards.map(id => ({ id, visible: false }));
  }
}
