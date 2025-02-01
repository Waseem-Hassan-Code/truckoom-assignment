import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _PaginatedResponseDto, ResponseDto } from './Model/ResponseDto';
import { LoginDto, RegisterDto } from './Model/AuthDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5270/api/Auth/';

  constructor(private http: HttpClient) {}

  registerUser<T>(data: RegisterDto): Observable<ResponseDto<T>> {
    return this.http.post<ResponseDto<T>>(`${this.baseUrl}register-user`, data);
  }

  authUser(data: LoginDto): Observable<ResponseDto<string>> {
    return this.http.post<ResponseDto<string>>(`${this.baseUrl}login`, data);
  }
}
