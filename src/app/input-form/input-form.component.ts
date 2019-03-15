import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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

  @Input()
  errorText  = `lenght of text must be: 0 < text < ${this.len}`;

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
