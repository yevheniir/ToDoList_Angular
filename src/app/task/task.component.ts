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

  @Output()
  SwitchComplete = new EventEmitter<{listId: string, id: number, text: string, complete: boolean}>();

  @Output()
  Change = new EventEmitter<{listId: string, id: number, text: string, complete: boolean}>();

  changing = false;

  ngOnInit() {
  }

  deleteTask() {
    this.Delete.emit(this.task);
  }

  switchComplete() {
    this.SwitchComplete.emit(this.task);
  }

  changeTask(newText: string) {
    if (newText.length > 0) {
      this.Change.emit({...this.task, text: newText});
    } else {
      alert('Your new text < 0');
    }
    this.changing = false;
  }

  startChanging() {
    this.changing = true;
  }

  cancelChanging() {
    this.changing = false;
  }
}
