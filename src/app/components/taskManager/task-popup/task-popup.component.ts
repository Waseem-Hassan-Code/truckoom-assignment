import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { ServicesService } from '../../../services/services.service';
import { ToastrService } from 'ngx-toastr';
import { TasksByServiceIdDto } from '../../../services/Model/TaskDto';
import { AssociationService } from '../../../services/association.service';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.css'],
})
export class TaskPopupComponent {
  tasks: TasksByServiceIdDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<TaskPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: string },
    private servicesService: ServicesService,
    private associationService: AssociationService,
    private toastr: ToastrService
  ) {
    this.loadTasks(data.serviceId);
  }

  loadTasks(serviceId: string) {
    this.servicesService.getTasksByServiceId(serviceId).subscribe({
      next: (response) => {
        if (response.isSuccess && response.response) {
          this.tasks = response.response;
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching tasks:', err);
        this.toastr.error('Error fetching tasks', 'Error');
      },
    });
  }

  onDelete(taskId: string) {
    this.associationService
      .deletAssociation(this.data.serviceId, taskId)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.toastr.success(response.message, 'Success');

            // Remove the deleted task from the `tasks` array
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
          } else {
            this.toastr.error(response.message, 'Error');
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting task:', err);
          this.toastr.error('Failed to delete task', 'Error');
        },
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
