import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponseModel } from '../../Models/userResponse.model';
import { UserLogin } from '../../Models/userlogin.model';
import { MessageService } from 'primeng/api';

import { UserService } from '../../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public UserModel: UserLogin = {
    Email: undefined,
    Password: undefined
  };
  public Token!: any;
  public ResponseModel: UserResponseModel = {
    message: undefined,
    model: undefined,
    statusCode: undefined,
    success: undefined
  };
  submitted = false;
  constructor(private router: Router,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.Token = localStorage.getItem("userToken");
  }
  error = () => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${this.ResponseModel.message}` })
  }
  success = () => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully login' })
  }



  get f(): { [key: string]: AbstractControl } { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.UserModel.Email = this.f['email'].value;
    this.UserModel.Password = this.f['password'].value
    this.userService.login(this.UserModel).subscribe(
      res => {
        this.ResponseModel.message = res.message;
        this.ResponseModel.model = res.model;
        this.ResponseModel.statusCode = res.statusCode;
        this.ResponseModel.success = res.success;
        if (res.success == true) {
          this.success();
          localStorage.setItem("userToken", "Bearer " + res.model.token.accessToken);
          localStorage.setItem("userName", res.model.userName);
          localStorage.setItem("userId", res.model.id);
          setTimeout(() => { this.router.navigate(['/form-management'], { relativeTo: this.route }); }, 1500);
        }
        else {
          this.error();
        }

      });
  }


}
