import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  lists: any = [];
  tasks: any = [];

  constructor(private toDoService: TodoService) {}

  ngOnInit() {

    this.lists = this.toDoService.listsHandler.getMass();

    this.toDoService.lists.subscribe((val: any) => {
        this.lists = val;
    });

    this.tasks = this.toDoService.tasksHandler.getMass();

    this.toDoService.tasks.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addList(listText: string) {
    this.toDoService.addList({id: listText, pin: false});
  }

  deleteList(list: {id: string, pin: boolean}) {
    this.toDoService.deleteList(list);
  }

  changeList(list: {id: string, pin: boolean}) {
    this.toDoService.changeList(list);
  }

}
