import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  lists = [
    {id: 'mainList'}
  ];

  tasks = [
    {listId: 'mainList', id: 1, text: 'first task', complete: true},
    {listId: 'mainList', id: 2, text: 'second task', complete: false},
  ];

  currentList = this.lists[0] || {id: 'mainList'};

  currentTaskId = this.tasks.length;

  addList(list: {id: string}) {
    this.lists.push(list);
  }

  deleteList(list: {id: string}) {
    this.lists.splice(this.lists.indexOf(list), 1);
    this.currentList = list.id === this.currentList.id ? this.lists[0] || {id: 'mainList'} : this.currentList;
  }

  addTask(task: {listId: string, text: string, complete: boolean}) {
    this.tasks.push({...task, id: this.currentTaskId++});
  }

  deleteTask(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  switchList(list: {id: string}) {
    this.currentList = list;
  }
}
