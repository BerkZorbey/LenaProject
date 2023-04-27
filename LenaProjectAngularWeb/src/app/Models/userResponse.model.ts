import { User } from "./user.model";

export class UserResponseModel {
  statusCode: any;
  success: any;
  message: any;
  model: any;
  constructor(
    statusCode: number,
    success: boolean,
    message: string,
    model: User
  ) { }
}
