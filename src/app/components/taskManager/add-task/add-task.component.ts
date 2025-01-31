import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      remarks: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value).subscribe((res) => {
        if (res.isSuccess) {
          this.resetForm();
          this.router.navigate(['/tasks/view']);
          this.toastr.success(res.message);
        }
      });
    }
  }

  resetForm(): void {
    this.taskForm.reset();
  }
}
