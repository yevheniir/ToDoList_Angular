import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  list: {id: string, pin: boolean};

  @Input()
  active: {id: string};

  @Input()
  tasks: any = [];

  @Output()
  Delete = new EventEmitter<{id: string, pin: boolean}>();

  @Output()
  Change = new EventEmitter<{id: string, pin: boolean}>();

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

  switchPin() {
    event.stopPropagation();
    this.Change.emit({...this.list, pin: !this.list.pin});
  }
}
