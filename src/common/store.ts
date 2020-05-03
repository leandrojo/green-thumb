type Reducer = (state: State, action: Reducers) => any;

interface State {
  [key: string]: any;
}

interface Action {
  [key: string]: any;
}

interface Reducers {
  [key: string]: Reducer;
}

export function combineReducers(reducers: Reducers) {
  return (before: State, action: Action) => {
    let states: State = {};

    Object.keys(reducers).forEach((k: string) => {
      let reducer = reducers[k];
      let state = before[k];

      states[k] = reducer(state, action);
    });

    return states;
  };
}

export function createStore(reducer: (...args: any[]) => any) {
  let state: any = {};
  let listeners: (() => void)[] = [];

  const getState = () => state;

  const subscribe = (listener: () => void) => {
    listeners.push(listener);
  };

  const dispatch = (action: any) => {
    state = reducer(state, action);
    listeners.forEach(fn => fn());
  };

  dispatch({ type: "INIT" });

  return {
    dispatch,
    subscribe,
    getState
  };
}
