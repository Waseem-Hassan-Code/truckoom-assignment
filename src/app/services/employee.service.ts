import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  addEmployee(data){
    return this.http.post('http://localhost:3000/employees',data);
  }

  getEmployee(){
    return this.http.get('http://localhost:3000/employees');
  }

  getEmployeeByID(id){
    return this.http.get(`http://localhost:3000/employees/${id}`);
  }

  editEmployee(id, data){
    return this.http.patch(`http://localhost:3000/employees/${id}`, data);
  }

  deleteEmployee(id){
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }
}
