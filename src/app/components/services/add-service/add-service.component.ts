import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css',
})
export class AddServiceComponent {
  serviceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServicesService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      description: ['', Validators.required],
      remarks: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      this.serviceService
        .addService(this.serviceForm.value)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.resetForm();
            this.router.navigate(['/services/view']);
            this.toastr.success(res.message);
          }
        });
    }
  }

  resetForm(): void {
    this.serviceForm.reset();
  }
}
