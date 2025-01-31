import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ViewServicesComponent } from './components/services/view-services/view-services.component';
import { AddServiceComponent } from './components/services/add-service/add-service.component';
import { AddTaskComponent } from './components/taskManager/add-task/add-task.component';
import { ViewTasksComponent } from './components/taskManager/view-tasks/view-tasks.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

  // Services Routes
  { path: 'services/add', component: AddServiceComponent },
  { path: 'services/view', component: ViewServicesComponent },

  // Tasks Routes
  { path: 'tasks/add', component: AddTaskComponent },
  { path: 'tasks/view', component: ViewTasksComponent },
  //Other
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
