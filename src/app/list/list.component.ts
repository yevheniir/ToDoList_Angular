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

  @Output()
  Delete = new EventEmitter<{id: string}>();

  constructor() { }

  ngOnInit() {

  }

  deleteList() {
    this.Delete.emit(this.list);
  }
}
