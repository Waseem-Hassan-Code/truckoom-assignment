export interface DropDownListDto {
  servicesDdl?: DropDownListBody[];
  tasksDdl?: DropDownListBody[];
}

export interface DropDownListBody {
  id: string;
  name: string;
}

export interface AssociationRequestDto {
  serviceId: string;
  taskId: string;
}
