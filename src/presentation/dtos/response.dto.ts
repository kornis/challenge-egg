export class ResponseDto {
  status: number;
  message: string;
  data?: Record<string, any>;
  timestamps?: string;
  constructor(status: number, message: string, data?: Record<string, any>, timestamps?: boolean) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.timestamps = timestamps ? Date.now().toString() : undefined;
  }
}
