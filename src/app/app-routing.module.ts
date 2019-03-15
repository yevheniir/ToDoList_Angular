import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksMainComponent } from './tasks-main/tasks-main.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path: '', component: ListsComponent },
  { path: ':id', component: TasksMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
