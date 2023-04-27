export class Token {
  Id: any;
  AccessToken: any;
  TokenExpiration: any;
  RefreshToken: any;
  RefreshTokenExpiration: any;
  constructor(
    Id: string,
    AccessToken: string,
    TokenExpiration: Date,
    RefreshToken: string,
    RefreshTokenExpiration: Date
  ) { }
}
