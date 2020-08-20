import {Action, createReducer, on} from '@ngrx/store';
import {gameActions} from './game.actions';
import {LocalStorageService} from '../../services/local-storage.service';
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

const reducer = createReducer(
  new State(), // dummy, we inject the one from localStorage
  // INIT_NEW_GAME
  // ==================
  on(gameActions.initNewGame, (state: State, props) => {
    const deckSize = props.deckSize ? props.deckSize : state.deckSize;
    const cardIds: number[] = [];
    for (let i = 0; i < deckSize; i++) {
      cardIds.push(i);
      cardIds.push(i);
    }
    return {
      ...state,
      tries: 0,
      cards: arrayShuffle<number>(cardIds)
    };
  }),
  // REMOVE_CARD
  // ==================
  on(gameActions.removeCard, (state: State, props): State => {
    return {
      ...state,
      cards: state.cards.filter(i => i !== props.id)
    };
  }),
  // INCREASE_TRY_COUNT
  // ==================
  on(gameActions.increaseTryCount, (state: State): State => {
    return {
      ...state,
      tries: state.tries + 1
    };
  }),
  // SAVE_HIGH_SCORE
  // ==================
  on(gameActions.saveHighScore, (state: State): State => {
    const { tries } = state;
    let score = state.scores.find(item => item.deckSize === state.deckSize);
    let scores = state.scores.slice();
    if (!score) {
      scores.push({ best: tries, deckSize: state.deckSize });
    } else {
      scores = scores.map(item => ({
        ...item,
        best: item.best > tries ? tries : item.best
      }));
    }
    score = scores.find(item => item.deckSize === state.deckSize);
    return {
      ...state,
      scores,
      best: score ? score.best : 0
    };
  })
);

const storage = new LocalStorageService('game-state');

// if we _really_ want to test this, we can add a mockStorage parameter
// but of course this whole thing is not really "angularish"
export function gameReducer(state: State | undefined, action: Action): State {
  if (!state) { // inject initial state, if possible
    const persistedState = (JSON.parse(storage.getItem()) || {}) as State;
    state = new State();
    Object.keys(state).forEach(key => { state[key] = persistedState[key] || state[key]; });
  }
  const ret = reducer(state, action);
  storage.setItem(JSON.stringify(ret));
  return ret;
}
