import {EventEmitter, Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {UtilsService} from './utils.service';

interface IHighScoreItem {
  deckSize: number;
  best: number;
}

// no time for observables, sry
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
  readonly REVEAL_TIMEOUT = 1000;
  private _state = new GameState();
  private storage: LocalStorageService;
  newGameInitialized: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private utils: UtilsService
  ) {
    this.storage = new LocalStorageService('game-state');
    this.loadState();
  }

  initNewGame(n = 0) {
    n = this._state.deckSize = n || this._state.deckSize;
    this._state.tries = 0;
    const cardIds: number[] = [];
    for (let i = 0; i < n; i++) {
      cardIds.push(i);
      cardIds.push(i);
    }
    this._state.cards = this.utils.arrayShuffle<number>(cardIds);
    this.saveState();
    this.newGameInitialized.emit(true);
  }

  removeCard(id: number) {
    this._state.cards = this._state.cards.filter(i => i !== id);
    this.saveState();
  }

  increaseTryCount() {
    this._state.tries++;
    this.saveState();
  }

  saveHighScore() {
    const state = this._state;
    const { tries } = state;
    const score = state.scores.find(score => score.deckSize === state.deckSize);
    if (!score) {
      state.scores.push({ best: tries, deckSize: state.deckSize})
    } else {
      if (score.best > tries) {
        score.best = tries;
      }
    }
    this.saveState();
  }

  get state(): GameState {
    return this.utils.simpleClone<GameState>(this._state);
  }

  get best() {
    const state = this._state;
    const score = state.scores.find(score => score.deckSize === state.deckSize);
    if (!score) {
      return 0;
    }
    return score.best;
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
