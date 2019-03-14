import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';

class Event {
  type: string;
  payload: any;
  constructor(type: string, payload: any) {
    this.type = type;
    this.payload = payload;
  }
}
class EventHandler {
  currentMass: any;
  mass: any;

  constructor(mass) {
    this.mass = mass;
    mass.subscribe((val) => {
      this.currentMass = val;
    });
  }

  use(event: Event) {
    switch (event.type) {
      case 'ADD_ALL':
        this.mass.next( event.payload );
        break;
      case 'ADD':
        this.mass.next( [...this.currentMass, event.payload] );
        break;
      case 'DELETE':
        let newMass = this.currentMass.filter((el: any) => {
          return el.id !== event.payload.id;
        });
        this.mass.next( [...newMass] );
        break;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  tasks = new Subject();

  lists = new Subject();

  currentList = this.lists[0] || {id: 'mainList'};


  listsHandler = new EventHandler(this.lists);

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/lists').subscribe(lists => {
      this.listsHandler.use(new Event('ADD_ALL', lists));
    });

    this.http.get('http://localhost:3000/tasks').subscribe(tasks => {
      // tslint:disable-next-line:forin
      for (const task in tasks) {
        this.tasks.next(tasks[task]);
      }
    });
  }

  addList(list: {id: string}) {
    this.http.post('http://localhost:3000/lists', list).subscribe(res => {
      this.listsHandler.use(new Event('ADD', list));
    },
    err => { console.log(err); });
  }

  deleteList(list: {id: string}) {
    this.http.delete(`http://localhost:3000/lists/${list.id}`).subscribe(res => {
      this.currentList = list.id === this.currentList.id ? this.lists[0] || {id: 'mainList'} : this.currentList;
      this.listsHandler.use(new Event('DELETE', list));
    },
    err => { console.log(err); });
  }

  addTask(task: {listId: string, text: string, complete: boolean}) {
    // this.tasks.push({...task, id: this.currentTaskId++});
  }

  deleteTask(task: {listId: string, id: number, text: string, complete: boolean}) {
    // this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  switchList(list: {id: string}) {
    this.currentList = list;
  }

  switchComplete(task: {listId: string, id: number, text: string, complete: boolean}) {
    // this.tasks[this.tasks.indexOf(task)].complete = !this.tasks[this.tasks.indexOf(task)].complete;
  }

  changeTask(newTask: {listId: string, id: number, text: string, complete: boolean}) {
    // for (const task of this.tasks) {
    //   if (task.id === newTask.id) {
    //     task.text = newTask.text;
    //   }
    // }
  }
}

