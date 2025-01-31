import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _PaginatedResponseDto, ResponseDto } from './Model/ResponseDto';
import { TaskDto, TaskModel } from './Model/TaskDto';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = 'http://localhost:5270/api/Task/';

  constructor(private http: HttpClient) {}

  addTask<T>(data: TaskDto): Observable<ResponseDto<T>> {
    return this.http.post<ResponseDto<T>>(`${this.baseUrl}add-new-task`, data);
  }

  deleteTask<T>(taskId: string): Observable<ResponseDto<T>> {
    return this.http.delete<ResponseDto<T>>(
      `${this.baseUrl}delete-task?taskId=${taskId}`
    );
  }

  getTasks(
    searchString: string,
    pageSize: number,
    pageNumber: number
  ): Observable<ResponseDto<_PaginatedResponseDto<TaskModel>>> {
    let params = new URLSearchParams();

    if (searchString) {
      params.append('taskName', searchString);
    }
    params.append('pageSize', pageSize.toString());
    params.append('pageNumber', pageNumber.toString());

    return this.http.get<ResponseDto<_PaginatedResponseDto<TaskModel>>>(
      `${this.baseUrl}get-tasks?${params.toString()}`
    );
  }

  updateTask<T>(data: TaskDto): Observable<ResponseDto<T>> {
    return this.http.put<ResponseDto<T>>(`${this.baseUrl}update-task`, data);
  }
}
