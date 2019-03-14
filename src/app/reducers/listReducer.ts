import { Event } from '../Event';
import { Reducer } from './reducer';

export class ListReducer implements Reducer {
  reduce(mass: any, event: Event) {
    switch (event.type) {
      case 'ADD_ALL':
        return event.payload ;

      case 'ADD':
        return [...mass, event.payload];

      case 'DELETE':
        const newMass = mass.filter((el: any) => {
          return el.id !== event.payload.id;
        });
        return [...newMass];
    }
  }
}
