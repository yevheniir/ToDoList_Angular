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
    try {
      this.lists = this.toDoService.listsHandler.getMass();
    } catch {}

    this.toDoService.lists.subscribe((val: any) => {
        this.lists = val;
    });

    try {
      this.tasks = this.toDoService.tasksHandler.getMass();
    } catch {}

    this.toDoService.tasks.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addList(listText: string) {
    this.toDoService.addList({id: listText});
  }

  deleteList(list: {id: string}) {
    this.toDoService.deleteList(list);
  }

}
