import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksMainComponent } from './tasks-main/tasks-main.component';

const routes: Routes = [
  { path: '**', component: TasksMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
