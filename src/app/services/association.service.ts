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

  deletAssociation<T>(
    serviceId: string,
    taskId: string
  ): Observable<ResponseDto<T>> {
    return this.http.delete<ResponseDto<T>>(
      `${this.baseUrl}delete-association?serviceId=${serviceId}&taskId=${taskId}`
    );
  }
}
