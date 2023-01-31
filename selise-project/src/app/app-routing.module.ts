import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { UsersTableComponent } from './users-table/users-table.component';

const routes: Routes = [
  {path: 'input-form/:phone', component: InputFormComponent},
  {path: 'users-table', component: UsersTableComponent},
  {path: '', pathMatch: 'full', redirectTo: '/users-table'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
