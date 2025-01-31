import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import {
  _PaginatedResponseDto,
  ResponseDto,
  ServiceModel,
} from '../../../services/Model/ResponseDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-services',
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.css'],
})
export class ViewServicesComponent implements OnInit {
  services: ServiceModel[] = [];
  totalRecords: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  errorMessage: string = '';
  dataSource = new MatTableDataSource<ServiceModel>(this.services);
  displayedColumns: string[] = [
    'id',
    'serviceName',
    'tasks',
    'description',
    'modifiedBy',
    'createdBy',
    'createdDate',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ServicesService: ServicesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.ServicesService.getServices(
      '',
      this.pageSize,
      this.currentPage
    ).subscribe({
      next: (response: ResponseDto<_PaginatedResponseDto<ServiceModel>>) => {
        if (response.isSuccess && response.response) {
          this.services = response.response.data || [];
          this.totalRecords = response.response.totalRecords || 0;
          this.currentPage = response.response.currentPage || 1;
          this.dataSource = new MatTableDataSource<ServiceModel>(this.services);
          this.dataSource.paginator = this.paginator;
          this.toastr.success(response.message, 'Success');
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to load services';
      },
    });
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadServices();
  }
  onDelete(rowId: string) {
    console.log('Delete clicked for row with ID:', rowId);
    this.ServicesService.deleteService(rowId).subscribe({
      next: (response: ResponseDto<any>) => {
        if (response.isSuccess) {
          this.toastr.success(response.message);
          this.loadServices();
        } else {
          this.toastr.error(response.message, 'Success');
        }
      },
      error: (err) => {
        this.toastr.error('Failed to delete service', 'Error');
      },
    });
  }

  viewTasks(serviceId: string) {
    this.ServicesService.getTasksByServiceId(serviceId).subscribe({
      next: (response) => {
        if (response.response == null) {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.isSuccess) {
          this.toastr.success(response.message, 'Success');
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error: (err) => {
        this.toastr.error('Error fetching tasks', 'Error');
      },
    });
  }
}
