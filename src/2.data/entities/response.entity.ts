export interface ResponseEntity<T> {
  timeStamp?: string;
  message?: string;
  success?: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  Code?: number;
  Status?: string;
  Type?: any;
}
