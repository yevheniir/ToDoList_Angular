import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input()
  task: {listId: string, id: number, text: string, complete: boolean};

  @Output()
  Delete = new EventEmitter<{listId: string, id: number, text: string, complete: boolean}>();

  constructor() { }

  ngOnInit() {
  }

  deleteTask() {
    this.Delete.emit(this.task);
  }

}
