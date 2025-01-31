import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _PaginatedResponseDto, ResponseDto } from './Model/ResponseDto';
import { TaskDto, TaskModel } from './Model/TaskDto';
import { AssociationRequestDto, DropDownListDto } from './Model/AssociationDto';

@Injectable({
  providedIn: 'root',
})
export class AssociationService {
  private baseUrl = 'http://localhost:5270/api/Association/';

  constructor(private http: HttpClient) {}

  addAssociation<T>(data: AssociationRequestDto): Observable<ResponseDto<T>> {
    return this.http.post<ResponseDto<T>>(
      `${this.baseUrl}add-association`,
      data
    );
  }

  getDropDownLists(): Observable<ResponseDto<DropDownListDto>> {
    return this.http.get<ResponseDto<DropDownListDto>>(
      `${this.baseUrl}get-ddl-lists`
    );
  }

  updateTask<T>(data: TaskDto): Observable<ResponseDto<T>> {
    return this.http.put<ResponseDto<T>>(`${this.baseUrl}update-task`, data);
  }
}
