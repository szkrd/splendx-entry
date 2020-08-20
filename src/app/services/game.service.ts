import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {UtilsService} from './utils.service';

interface IHighScoreItem {
  deckSize: number;
  best: number;
}

class GameState {
  deckSize = -1;
  cards: number[] = [];
  scores: IHighScoreItem[] = [];
  tries = 0;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _state = new GameState();
  private storage: LocalStorageService;

  constructor(
    private utils: UtilsService
  ) {
    this.storage = new LocalStorageService('game-state');
    this.loadState();
  }

  initNewGame(n = 0) {
    this._state.deckSize = n;
    const cardIds: number[] = [];
    for (let i = 0; i < n; i++) {
      cardIds.push(i);
      cardIds.push(i);
    }
    this._state.cards = this.utils.arrayShuffle<number>(cardIds);
    this.saveState();
  }

  get state(): GameState {
    return this.utils.simpleClone<GameState>(this._state);
  }

  private saveState() {
    this.storage.setItem(JSON.stringify(this._state));
  }

  private loadState() {
    const state = (JSON.parse(this.storage.getItem()) || {}) as GameState;
    Object.keys(this._state).forEach(key => {
      this._state[key] = state[key] || this._state[key];
    });
  }
}
