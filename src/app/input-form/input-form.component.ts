import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  text = '';
  valid = true;

  @Output()
  Add = new EventEmitter<string>();

  @Input()
  len: number;

  errorText: any = `lenght of text must be: 0 < text < ${this.len}`;

  constructor(private toDoService: TodoService) {
    toDoService.error.subscribe((err) => {
      this.valid = false;
      this.errorText = err;
    });
  }

  ngOnInit() {
  }

  addData() {
    if (this.text.length > 0 && this.text.length < this.len) {
      this.Add.emit(this.text);
    } else {
      this.valid = false;
      this.errorText = `lenght of text must be: 0 < text < ${this.len}`;
    }
    this.text = '';
  }

  onChange() {
    if (this.text.length > 0 && this.text.length < this.len) {
      this.valid = true;
    } else {
      this.valid = false;
      this.errorText = `lenght of text must be: 0 < text < ${this.len}`;
    }
  }

}
