import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import {MatDividerModule} from '@angular/material/divider';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { ViewDepartmentComponent } from './components/department/view-department/view-department.component';
import { EditDepartmentComponent } from './components/department/edit-department/edit-department.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './components/employee/view-employee/view-employee.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';



@NgModule({
  declarations: [
    AppComponent,
    AddDepartmentComponent,
    ViewDepartmentComponent,
    EditDepartmentComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    EditEmployeeComponent,
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
