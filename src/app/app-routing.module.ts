import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewDepartmentComponent } from './components/department/view-department/view-department.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './components/employee/view-employee/view-employee.component';
import { EditDepartmentComponent } from './components/department/edit-department/edit-department.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  //Department Routes
  { path: 'department/add', component: AddDepartmentComponent },
  { path: 'department/view', component: ViewDepartmentComponent },
  { path: 'department/edit/:id', component: EditDepartmentComponent },
  // Employee Routes
  { path: 'employee/add', component: AddEmployeeComponent },
  { path: 'employee/view', component: ViewEmployeeComponent },
  { path: 'employee/edit/:id', component: EditEmployeeComponent },
  //Other
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
