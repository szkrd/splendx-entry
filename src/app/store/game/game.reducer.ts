import {Action, createReducer, on} from '@ngrx/store';
import {gameActions} from './game.actions';
import {LocalStorageService} from '../../services/local-storage.service';
import clone from '../../utils/clone';
import arrayShuffle from '../../utils/array-shuffle';

interface IHighScoreItem {
  deckSize: number;
  best: number;
}

class State {
  deckSize = -1;
  cards: number[] = [];
  scores: IHighScoreItem[] = [];
  tries = 0;
  best = 0;
}

// TODO use reducer properly
class StateManager {
  private state: State;
  private storage = new LocalStorageService('game-state');

  constructor(state: State) {
    this.state = state;
    this.loadState();
  }

  getState(): State {
    return clone<State>(this.state);
  }

  initNewGame(n = 0) {
    n = this.state.deckSize = n || this.state.deckSize;
    this.state.tries = 0;
    const cardIds: number[] = [];
    for (let i = 0; i < n; i++) {
      cardIds.push(i);
      cardIds.push(i);
    }
    this.state.cards = arrayShuffle<number>(cardIds);
    this.saveState();
  }

  removeCard(id: number) {
    this.state.cards = this.state.cards.filter(i => i !== id);
    this.saveState();
  }

  increaseTryCount() {
    this.state.tries++;
    this.saveState();
  }

  saveHighScore() {
    const state = this.state;
    const { tries } = state;
    let score = state.scores.find(item => item.deckSize === state.deckSize);
    if (!score) {
      state.scores.push({ best: tries, deckSize: state.deckSize });
    } else {
      if (score.best > tries) {
        score.best = tries;
      }
    }
    // TODO cleanup
    score = this.state.scores.find(item => item.deckSize === this.state.deckSize);
    this.state.best = score ? score.best : 0;
    this.saveState();
  }

  private saveState() {
    this.storage.setItem(JSON.stringify(this.state));
  }

  private loadState() {
    const state = (JSON.parse(this.storage.getItem()) || {}) as State;
    Object.keys(this.state).forEach(key => { this.state[key] = state[key] || this.state[key]; });
  }
}

const initialState = new State();
const stateManager = new StateManager(new State());

// const storage = new LocalStorageService('game-state');

const reducer = createReducer(
  initialState,
  on(gameActions.initNewGame, (state: State, props) => {
    stateManager.initNewGame(props.deckSize);
    return stateManager.getState(); // { ...state };
  }),
  on(gameActions.removeCard, (state: State, props) => {
    stateManager.removeCard(props.id);
    return stateManager.getState();
  }),
  on(gameActions.increaseTryCount, (state: State) => {
    stateManager.increaseTryCount();
    return stateManager.getState();
  }),
  on(gameActions.saveHighScore, (state: State) => {
    stateManager.saveHighScore();
    return stateManager.getState();
  })
);

export function gameReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
