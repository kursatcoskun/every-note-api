import { GenericResult } from './genericResult';

export interface GenericResponse<T> {
  data: T;
  result: GenericResult;
}
