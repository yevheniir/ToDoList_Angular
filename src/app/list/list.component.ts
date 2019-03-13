import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  list: {id: string};

  @Output()
  Delete = new EventEmitter<{id: string}>();

  @Output()
  Switch = new EventEmitter<{id: string}>();

  constructor() { }

  ngOnInit() {
  }

  deleteList() {
    this.Delete.emit(this.list);
  }

  switchList() {
    this.Switch.emit(this.list);
  }

}
