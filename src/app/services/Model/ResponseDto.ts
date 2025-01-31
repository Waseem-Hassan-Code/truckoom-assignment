export interface ResponseDto<T> {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  response?: T;
}

export interface _PaginatedResponseDto<T> {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  data: T[];
}

export interface ServiceModel {
  serviceName: string;
  description: string;
  remarks: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string | null;
  lastModifiedDate: string | null;
  isDeleted: boolean;
  id: string;
}

export interface PaginatedResponseDto<T> {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  data?: T;
}
