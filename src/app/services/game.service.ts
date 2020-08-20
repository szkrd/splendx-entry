import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';

class GameState {
  deckSize = -1;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private state = new GameState();
  private storage: LocalStorageService;

  constructor() {
    this.storage = new LocalStorageService('game-state');
    this.loadState();
  }

  setDeckSize(n = 0) {
    this.state.deckSize = n;
    this.saveState();
  }

  private saveState() {
    this.storage.setItem(JSON.stringify(this.state));
  }

  private loadState() {
    const state = (JSON.parse(this.storage.getItem()) || {}) as GameState;
    this.state.deckSize = state.deckSize || this.state.deckSize;
  }
}
