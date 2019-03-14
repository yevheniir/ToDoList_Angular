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

  constructor(private toDoService: TodoService) {}

  ngOnInit() {
    this.toDoService.lists.subscribe((val: any) => {
        this.lists = val;
    });
  }

  addList(listText: string) {
    this.toDoService.addList({id: listText});
  }

  deleteList(list: {id: string}) {
    this.toDoService.deleteList(list);
  }

}
