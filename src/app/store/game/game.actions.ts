import {createAction, props} from '@ngrx/store';

export const gameActions = {
  initNewGame: createAction('[Game] initNewGameAction', props<{ deckSize?: number }>()),
  removeCard: createAction('[Game] removeCardAction', props<{ id: number }>()),
  increaseTryCount: createAction('[Game] increaseTryCountAction'),
  saveHighScore: createAction('[Game] saveHighScoreAction')
};
