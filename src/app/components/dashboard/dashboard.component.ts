import { Component, OnInit } from '@angular/core';
import { AssociationService } from '../../services/association.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AssociationRequestDto,
  DropDownListBody,
} from '../../services/Model/AssociationDto';

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
    // Fetch the dropdown lists
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

    // Initialize the form
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
      this.associationService.addAssociation(data).subscribe((response) => {
        if (response.isSuccess) {
          this.toastr.success(response.message, 'Success');
        } else {
          this.toastr.error(response.message, 'Error');
        }
      });
    }
  }
}
