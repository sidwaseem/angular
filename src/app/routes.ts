import { NgModule }             from '@angular/core';
import { List, NavHistory, AddCustomer, EditCustomer, PageNotFoundComponent } from './components';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: List },
  { path: 'adduser', component: AddCustomer },
  { path: 'edituser/:id', component: EditCustomer },
  { path: 'history/:id', component: NavHistory },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }