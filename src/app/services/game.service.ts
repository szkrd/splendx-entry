import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {UtilsService} from './utils.service';

class GameState {
  deckSize = -1;
  cards: number[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private state = new GameState();
  private storage: LocalStorageService;

  constructor(
    private utils: UtilsService
  ) {
    this.storage = new LocalStorageService('game-state');
    this.loadState();
  }

  initNewGame(n = 0) {
    this.state.deckSize = n;
    const cardIds: number[] = [];
    for (let i = 0; i < n; i++) {
      cardIds.push(i);
      cardIds.push(i);
    }
    this.state.cards = this.utils.arrayShuffle<number>(cardIds);
    console.log(1, this.state.cards)
    this.saveState();
  }

  private saveState() {
    this.storage.setItem(JSON.stringify(this.state));
  }

  private loadState() {
    const state = (JSON.parse(this.storage.getItem()) || {}) as GameState;
    this.state.deckSize = state.deckSize || this.state.deckSize;
    this.state.cards = state.cards || this.state.cards;
  }
}
