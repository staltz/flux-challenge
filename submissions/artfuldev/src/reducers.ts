import { Stream } from 'xstream';
import { IIntent } from './intent';
import { IState } from './definitions';

export const InitialState: IState = {
  planet: 'some planet',
  jedis: [{
    name: 'some name',
    home: 'some home'
  }]
};

function reducers(actions: IIntent): Stream<(state: IState) => IState> {
  const messageReducer$ =
    actions.nameChanged$
      .map(name =>
        state => {
          const message =
            name
              ? `Hello, ${name}!`
              : 'Hello! Please enter your name...';
          return {
            message
          };
        });
  return messageReducer$;
}

export default reducers;
