import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  _PaginatedResponseDto,
  PaginatedResponseDto,
  ResponseDto,
  ServiceModel,
} from './Model/ResponseDto';
import { ServiceDto } from './Model/ServicesDto';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private baseUrl = 'http://localhost:5270/api/Services/';

  constructor(private http: HttpClient) {}

  addService<T>(data: ServiceDto): Observable<ResponseDto<T>> {
    return this.http.post<ResponseDto<T>>(
      `${this.baseUrl}add-new-service`,
      data
    );
  }

  getTasksByServiceId<T>(serviceId: string): Observable<ResponseDto<T>> {
    return this.http.get<ResponseDto<T>>(
      `${this.baseUrl}get-tasks-by-serviceId?serviceId=${serviceId}`
    );
  }

  deleteService<T>(serviceId: string): Observable<ResponseDto<T>> {
    return this.http.delete<ResponseDto<T>>(
      `${this.baseUrl}delete-service?serviceId=${serviceId}`
    );
  }

  getServices(
    searchString: string,
    pageSize: number,
    pageNumber: number
  ): Observable<ResponseDto<_PaginatedResponseDto<ServiceModel>>> {
    let params = new URLSearchParams();

    if (searchString) {
      params.append('serviceName', searchString);
    }
    params.append('pageSize', pageSize.toString());
    params.append('pageNumber', pageNumber.toString());

    return this.http.get<ResponseDto<_PaginatedResponseDto<ServiceModel>>>(
      `${this.baseUrl}get-services?${params.toString()}`
    );
  }

  updateService<T>(data: any): Observable<ResponseDto<T>> {
    return this.http.put<ResponseDto<T>>(`${this.baseUrl}update-service`, data);
  }
}
