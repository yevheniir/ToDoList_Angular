import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  lists: {id: string}[];

  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.lists = this.toDoService.lists;
  }

  addList(listText: string) {
    this.toDoService.addList({id: listText});
  }

  deleteList(list: {id: string}) {
    this.toDoService.deleteList(list);
  }

  switchList(list: {id: string}) {
    this.toDoService.switchList(list);
  }

}
