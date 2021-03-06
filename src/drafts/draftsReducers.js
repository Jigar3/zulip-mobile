/* @flow strict-local */
import type { DraftState, Action } from '../types';
import { DRAFT_UPDATE, LOGOUT } from '../actionConstants';
import { NULL_OBJECT } from '../nullObjects';

const initialState = NULL_OBJECT;

const draftUpdate = (state, action) => {
  const narrowStr = JSON.stringify(action.narrow);

  if (action.content.trim().length === 0) {
    // New content is blank; delete the draft.
    if (!state[narrowStr]) {
      return state;
    }
    const newState = { ...state };
    delete newState[narrowStr];
    return newState;
  }

  return state[narrowStr] === action.content ? state : { ...state, [narrowStr]: action.content };
};

export default (state: DraftState = initialState, action: Action): DraftState => {
  switch (action.type) {
    case LOGOUT:
      return initialState;

    case DRAFT_UPDATE:
      return draftUpdate(state, action);

    default:
      return state;
  }
};
