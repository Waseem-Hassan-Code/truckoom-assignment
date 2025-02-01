import { Component, OnInit } from '@angular/core';
import { AssociationService } from '../../services/association.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AssociationRequestDto,
  DropDownListBody,
} from '../../services/Model/AssociationDto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  services: DropDownListBody[] = [];
  tasks: DropDownListBody[] = [];
  dropdownForm: FormGroup;

  constructor(
    private associationService: AssociationService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.associationService.getDropDownLists().subscribe(
      (response) => {
        if (response.isSuccess) {
          this.services = response.response?.servicesDdl || [];
          this.tasks = response.response?.tasksDdl || [];
        } else {
          this.toastr.error('Failed to load dropdown lists');
        }
      },
      (error) => {
        this.toastr.error('An error occurred while fetching data');
      }
    );

    this.dropdownForm = this.fb.group({
      selectedService: ['', Validators.required],
      selectedTask: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.dropdownForm.valid) {
      const selectedServiceId = this.dropdownForm.get('selectedService')?.value;
      const selectedTaskId = this.dropdownForm.get('selectedTask')?.value;
      const data: AssociationRequestDto = {
        serviceId: selectedServiceId,
        taskId: selectedTaskId,
      };

      this.associationService.addAssociation(data).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.toastr.success(response.message, 'Success');
          } else {
            this.toastr.error(response.message, 'Error');
          }
        },
        error: (err: HttpErrorResponse) => {
          const statusCode = err.status;
          const errorMessage =
            err.error?.message ||
            'An error occurred while processing your request.';

          if (statusCode === 400) {
            this.toastr.warning(errorMessage, 'Warning');
          }
          if (statusCode === 401) {
            this.toastr.warning(errorMessage, 'Bad Request');
          }
          if (statusCode === 500) {
            this.toastr.error(errorMessage, 'Error');
          }
        },
      });
    } else {
      this.toastr.error(
        'Please fill out the form correctly.',
        'Validation Error'
      );
    }
  }
}
