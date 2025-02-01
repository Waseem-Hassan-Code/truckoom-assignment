import { Component, ViewChild } from '@angular/core';
import { TaskModel } from '../../../services/Model/TaskDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TasksService } from '../../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import {
  _PaginatedResponseDto,
  ResponseDto,
} from '../../../services/Model/ResponseDto';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrl: './view-tasks.component.css',
})
export class ViewTasksComponent {
  services: TaskModel[] = [];
  totalRecords: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  errorMessage: string = '';
  dataSource = new MatTableDataSource<TaskModel>(this.services);
  displayedColumns: string[] = [
    'id',
    'taskName',
    'description',
    'modifiedBy',
    'createdBy',
    'createdDate',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private tasksService: TasksService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getTasks('', this.pageSize, this.currentPage).subscribe({
      next: (response: ResponseDto<_PaginatedResponseDto<TaskModel>>) => {
        if (response.isSuccess && response.response) {
          this.services = response.response.data || [];
          this.totalRecords = response.response.totalRecords || 0;
          this.currentPage = response.response.currentPage || 1;
          this.dataSource = new MatTableDataSource<TaskModel>(this.services);
          this.dataSource.paginator = this.paginator;
          this.toastr.success(response.message, 'Success');
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastr.error(
            'Your session has expired. Please log in again.',
            'Unauthorized'
          );
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Failed to load tasks';
          this.toastr.error(this.errorMessage, 'Error');
        }
      },
    });
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadTasks();
  }
  onDelete(rowId: string) {
    console.log('Delete clicked for row with ID:', rowId);
    this.tasksService.deleteTask(rowId).subscribe({
      next: (response: ResponseDto<any>) => {
        if (response.isSuccess) {
          this.toastr.success(response.message);
          this.loadTasks();
        } else {
          this.toastr.error(response.message, 'Success');
        }
      },
      error: (err) => {
        this.toastr.error('Failed to delete Task', 'Error');
      },
    });
  }
}
