import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  list: {id: string};

  @Input()
  active: {id: string};

  @Input()
  tasks: any = [];

  @Output()
  Delete = new EventEmitter<{id: string}>();

  uncompletedTasks = this.tasks.filter((task) => {
      return true;
    });

  constructor() {
  }

  ngOnInit() {
  }

  deleteList(event) {
    event.stopPropagation();
    this.Delete.emit(this.list);
  }
}
