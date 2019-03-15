import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-tasks-main',
  templateUrl: './tasks-main.component.html',
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent implements OnInit {
  tasks: any = [];
  currentTasks: {listId: string, id: number, text: string, complete: boolean}[];

  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.currentTasks = this.toDoService.tasksHandler.getMass().filter((task) => {
      return task.listId === this.toDoService.currentListHandler.getMass().id;
    });

    this.toDoService.currentList.subscribe((list: any) => {
      this.currentTasks = this.toDoService.tasksHandler.getMass().filter((task) => {
        return task.listId === list.id;
      });
    });

    this.toDoService.tasks.subscribe((task: any) => {
      this.tasks = task;
      this.currentTasks = this.tasks.filter((CureentTask) => {
        return CureentTask.listId === this.toDoService.currentListHandler.getMass().id;
      });
    });
  }

  addTask(taskText: string) {
    this.toDoService.addTask({
      listId: this.toDoService.currentListHandler.getMass().id,
      text: taskText,
      complete: false
    });
  }

  deleteTask(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.toDoService.deleteTask(task);
  }

  switchComplete(task: {listId: string, id: number, text: string, complete: boolean}) {
    task.complete = !task.complete;
    this.toDoService.switchComplete(task);
  }

  changeTask(task: {listId: string, id: number, text: string, complete: boolean}) {
    this.toDoService.changeTask(task);
  }

}
