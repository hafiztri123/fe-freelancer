export interface GenericResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface GenericResponseArray<T> {
  status: number;
  message: string;
  data: {
    data: T[];
  };
}
