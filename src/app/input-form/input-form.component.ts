import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  text = '';

  @Output()
  Add = new EventEmitter<string>();

  ngOnInit() {
  }

  addData() {
    this.Add.emit(this.text);
    this.text = '';
  }

}
