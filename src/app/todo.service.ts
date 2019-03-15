import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { EventHandler } from './EventHandler';
import { Event } from './Event';
import { ListReducer } from './reducers/listReducer';
import { TaskReducer } from './reducers/taskReducer';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  tasks = new Subject();
  lists = new Subject();
  error = new Subject();

  currentList: {id: string};

  listsHandler = new EventHandler(this.lists, new ListReducer());
  tasksHandler = new EventHandler(this.tasks, new TaskReducer());

  constructor(private http: HttpClient, private router: Router) {
    this.http.get('http://localhost:3000/lists').subscribe(lists => {
      this.listsHandler.use(new Event('ADD_ALL', lists));
    });

    this.http.get('http://localhost:3000/tasks').subscribe(tasks => {
      this.tasksHandler.use(new Event('ADD_ALL', tasks));
    });

    this.router.events.subscribe((rout) => {
      this.currentList = {id: this.router.url.slice(1, this.router.url.length)};
    });
  }

  addList(list: {id: string}) {
    this.http.post('http://localhost:3000/lists', list).subscribe(res => {
      this.listsHandler.use(new Event('ADD', res));
    },
    err => {
      this.error.next('You already have list with this name');
    });
  }

  deleteList(list: {id: string}) {
    this.http.delete(`http://localhost:3000/lists/${list.id}`).subscribe(res => {
      this.currentList = list.id === this.currentList.id ? this.lists[0] || {id: 'mainList'} : this.currentList;
      this.listsHandler.use(new Event('DELETE', list));
    },
    err => { console.log(err); });
  }

  addTask(task: {listId: string, text: string, complete: boolean}) {
    this.http.post('http://localhost:3000/tasks', task).subscribe(res => {
      this.tasksHandler.use(new Event('ADD', res));
    },
    err => { console.log(err); });
  }

  deleteTask(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.http.delete(`http://localhost:3000/tasks/${task.id}`).subscribe(res => {
      this.tasksHandler.use(new Event('DELETE', task));
    },
    err => { console.log(err); });
  }

  switchComplete(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.http.put(`http://localhost:3000/tasks/${task.id}`, task).subscribe(res => {
      this.tasksHandler.use(new Event('CHANGE', res));
    },
    err => { console.log(err); });
  }

  changeTask(newTask: {listId: string, id: number, text: string, complete: boolean}) {
    this.http.put(`http://localhost:3000/tasks/${newTask.id}`, newTask).subscribe(res => {
      this.tasksHandler.use(new Event('CHANGE', res));
    },
    err => { console.log(err); });
  }
}

