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
  lists$: Subject<Array<any>>;
  active: {id: string};

  constructor(private toDoService: TodoService) {
    this.lists$ = new Subject<Array<any>>();
   }

  ngOnInit() {
    this.lists$.subscribe(console.dir);

    setTimeout(() => {
      this.lists$.next([{id: 'mainList'}, {id: 'mainList'}, {id: 'mainList'}, {id: 'mainList'}]);
    }, 0);

    this.toDoService.lists.subscribe((val: any) => {
        this.lists = val;
    });
    this.active = this.toDoService.currentList;
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
