import { Event } from './Event';
import { Reducer } from './reducers/reducer';

export class EventHandler {
  currentMass: any;
  mass: any;
  reducer: Reducer;

  constructor(mass, reducer: Reducer) {
    this.mass = mass;
    this.reducer = reducer;
    mass.subscribe((val) => {
      this.currentMass = val;
    });
  }

  use(event: Event) {
    this.mass.next(this.reducer.reduce(this.currentMass, event)) ;
    // switch (event.type) {
    //   case 'ADD_ALL':
    //     this.mass.next( event.payload );
    //     break;

    //   case 'ADD':
    //     this.mass.next( [...this.currentMass, event.payload] );
    //     break;

    //   case 'DELETE':
    //     const newMass = this.currentMass.filter((el: any) => {
    //       return el.id !== event.payload.id;
    //     });
    //     this.mass.next( [...newMass] );
    //     break;

    //   case 'CHANGE':
    //     const changedMass = this.currentMass.map((el: any) => {
    //       if (el.id === event.payload.id) {
    //         el = event.payload;
    //       }
    //       return el;
    //     });
    //     this.mass.next( [...changedMass] );
    //     break;
    // }
  }
}
