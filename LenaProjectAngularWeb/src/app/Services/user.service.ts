import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogin } from '../Models/userlogin.model';
import { UserResponseModel } from '../Models/userResponse.model';
import { UserRegister } from '../Models/userregister.model';



@Injectable({ providedIn: 'root' })
export class UserService {
  public user!: Observable<UserLogin>;
  public userregister!: Observable<UserRegister>;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    
  }


  login(user: UserLogin) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<UserResponseModel>('api/login', JSON.stringify(user), { headers: headers });
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.router.navigate(['/'], { relativeTo: this.route }); 
  }

  register(userregister: UserRegister) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<UserResponseModel>('api/register', JSON.stringify(userregister), { headers: headers });  
  }

 
}
