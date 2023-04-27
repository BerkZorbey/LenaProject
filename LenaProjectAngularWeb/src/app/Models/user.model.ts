import { Form } from "./form.model";
import { Token } from "./token.model";

export class User {
  Id: any;
  UserName: any;
  Email: any;
  Password: any;
  Token: any;
  Forms: any;
  constructor(
    Id: string,
    UserName: string,
    Email: string,
    Password: string,
    Token: Token,
    Forms: Form[]
  ) { }
}
