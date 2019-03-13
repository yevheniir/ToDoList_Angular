import { Component, OnInit, DoCheck } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-tasks-main',
  templateUrl: './tasks-main.component.html',
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent implements OnInit, DoCheck {
  tasks: {listId: string, id: number, text: string, complete: boolean}[];
  currentTasks: {listId: string, id: number, text: string, complete: boolean}[];

  constructor(private toDoService: TodoService) { }

  ngDoCheck() {
    this.currentTasks = this.tasks.filter((task) => {
      return task.listId === this.toDoService.currentList.id;
    });
  }

  ngOnInit() {
    this.tasks = this.toDoService.tasks;
  }

  addTask(taskText: string) {
    this.toDoService.addTask({
      listId: this.toDoService.currentList.id,
      text: taskText,
      complete: false
    });
  }

  deleteTask(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.toDoService.deleteTask(task);
  }

}
