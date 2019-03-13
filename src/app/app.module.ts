import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { InputFormComponent } from './input-form/input-form.component';
import { ListsComponent } from './lists/lists.component';
import { TasksMainComponent } from './tasks-main/tasks-main.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    InputFormComponent,
    ListsComponent,
    TasksMainComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
