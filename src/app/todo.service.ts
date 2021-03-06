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

  currentList = new Subject();

  listsHandler = new EventHandler(this.lists, new ListReducer());
  tasksHandler = new EventHandler(this.tasks, new TaskReducer());
  currentListHandler = new EventHandler(this.currentList, new TaskReducer());

  constructor(private http: HttpClient, private router: Router) {
    this.http.get('http://localhost:8080/lists').subscribe(lists => {
      this.listsHandler.use(new Event('ADD_ALL', lists));
    });

    this.http.get('http://localhost:8080/tasks').subscribe(tasks => {
      this.tasksHandler.use(new Event('ADD_ALL', tasks));
    });

    this.router.events.subscribe((rout) => {
      this.currentList.next({id: this.router.url.slice(1, this.router.url.length)});
    });
  }

  addList(list: {id: string, pin: boolean}) {
    this.http.post('http://localhost:8080/lists', list).subscribe(res => {
      this.listsHandler.use(new Event('ADD', res));
    },
    err => {
      this.error.next('You already have list with this name');
    });
  }

  deleteList(list: {id: string, pin: boolean}) {
    this.http.delete(`http://localhost:8080/lists/${list.id}`).subscribe(res => {
      this.currentList.next(list.id === this.currentListHandler.getMass().id ? this.lists[0]
      || {id: 'mainList'} : this.currentListHandler.getMass());
      this.listsHandler.use(new Event('DELETE', list));
    },
    err => { console.log(err); });
  }

  addTask(task: any) {
    task.list = this.currentListHandler.getMass();
    delete task.listId;
    this.http.post('http://localhost:8080/tasks', task).subscribe(res => {
      this.tasksHandler.use(new Event('ADD', res));
    },
    err => { console.log(err); });
  }

  deleteTask(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.http.delete(`http://localhost:8080/tasks/${task.id}`).subscribe(res => {
      this.tasksHandler.use(new Event('DELETE', task));
    },
    err => { console.log(err); });
  }

  switchComplete(task: any) {
    task.list = this.currentListHandler.getMass();
    delete task.listId;
    this.http.put(`http://localhost:8080/tasks/${task.id}`, task).subscribe(res => {
      this.tasksHandler.use(new Event('CHANGE', res));
    },
    err => { console.log(err); });
  }

  changeTask(newTask: {listId: string, id: number, text: string, complete: boolean}) {
    this.http.put(`http://localhost:8080/tasks/${newTask.id}`, newTask).subscribe(res => {
      this.tasksHandler.use(new Event('CHANGE', res));
    },
    err => { console.log(err); });
  }

  changeList(list: {id: string, pin: boolean}) {
    this.http.put(`http://localhost:8080/lists/${list.id}`, list).subscribe(res => {
      this.listsHandler.use(new Event('CHANGE', res));
    },
    err => { console.log(err); });
  }
}

