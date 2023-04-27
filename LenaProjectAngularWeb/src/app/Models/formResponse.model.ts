import { Form } from "./form.model";

export class FormResponseModel {
  statusCode: any;
  success: any;
  message: any;
  model: any;
  constructor(
    statusCode: number,
    success: boolean,
    message: string,
    model: Form
  ) { }
}
