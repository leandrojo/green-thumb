import store from '.';

import { fetch, Plant } from '../services/plants';

interface PlantsState {
  type: string;
  items: Plant[];
  params: {
    pets?: boolean;
    sun?: string;
    water?: string;
  }
}

const initialState: PlantsState = {
  type: 'plants/init',
  items: [],
  params: {},
};

const plants = (state: any = initialState, action: any) => {
  const { type } = action;

  if (action.type === "plants/fetch") {
    const params = { ...state.params, ...action.params };
    const { pets, sun, water } = params;

    if ([pets, sun, water].includes(undefined) === false) {
      fetch(sun, water, pets === 'yes').then(items => {
        store.dispatch({
          type: 'plants/fetchSuccess',
          items,
        })
      });
    }

    return { ...state, params, type };
  }

  if (action.type === "plants/fetchSuccess") {
    return { ...state, ...action };
  }

  return state;
};

export default plants;
