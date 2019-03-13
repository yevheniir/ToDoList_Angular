import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input()
  tasks: {listId: string, id: number, text: string, complete: boolean}[];

  @Output()
  Delete = new EventEmitter<{listId: string, id: number, text: string, complete: boolean}>();

  @Output()
  SwitchComplete = new EventEmitter<{listId: string, id: number, text: string, complete: boolean}>();

  @Output()
  Change = new EventEmitter<{listId: string, id: number, text: string, complete: boolean}>();

  constructor() { }

  ngOnInit() {
  }

  deleteTask(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.Delete.emit(task);
  }

  switchComplete(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.SwitchComplete.emit(task);
  }

  changeTask(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.Change.emit(task);
  }

}
