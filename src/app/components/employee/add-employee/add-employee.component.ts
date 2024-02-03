import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../services/department.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{

  addEmployeeForm;

  bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  genders = ["Male", "Female"];
  departmentsList = [];
  designationList = [];


  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      employeeName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      designations: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobileNumber: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      bloodGroup: new FormControl(null, Validators.required),
    });

    this.getDepartments();
  }

  getDepartments(){
    let depts;
    this.departmentService.getDepartment().subscribe(response=>{
      depts = response;
      console.log(depts);
      depts.map(dept=>{
        // console.log(dept);
        this.departmentsList.push(dept.departmentName);
      })
      console.log(this.departmentsList)
    })

  }

  onDepartmentSelect(){
    console.log(this.addEmployeeForm.value.department);
    this.departmentService.getDepartmentByName(this.addEmployeeForm.value.department).subscribe(response=>{
      console.log(response);
      this.designationList = response[0]['designations'];
    })
  }

  addEmployee(){
    console.log(this.addEmployeeForm.value);
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe(response=>{
      console.log(response);
      this.toastr.success('Employee Added');
      this.router.navigate(['/employee/view']);
    })
  }
}
