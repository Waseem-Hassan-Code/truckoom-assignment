import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private baseUrl = 'https://localhost:7028/api/Services/';
  constructor(private http: HttpClient) {}

  addService(data) {
    return this.http.post(this.baseUrl + `add-new-service`, data);
  }

  deleteService(serviceId: string) {
    return this.http.delete(
      this.baseUrl + `delete-service?serviceId=${serviceId}`
    );
  }

  getServices(searchString: string, pageSize: number, pageNumber: number) {
    return this.http.get(
      this.baseUrl +
        `get-services?serviceName=${searchString}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }

  updateService(data) {
    return this.http.put(this.baseUrl + `update-service`, data);
  }
}
