import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  departmentCount;
  employeeCount;

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ){}

  ngOnInit(): void {
    this.departmentService.getDepartment().subscribe(response=>{
      this.departmentCount=response['length'];
      console.log(this.departmentCount);
    });

    this.employeeService.getEmployee().subscribe(response=>{
      this.employeeCount=response['length'];
      console.log(this.employeeCount);
    })
  }

}
