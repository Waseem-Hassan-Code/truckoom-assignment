export interface TaskDto {
  id?: string;
  taskName: string;
  description: string;
  remarks: string;
}

export interface TaskModel {
  taskName: string;
  description: string;
  remarks: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string | null;
  lastModifiedDate: string | null;
  isDeleted: boolean;
  id: string;
}
