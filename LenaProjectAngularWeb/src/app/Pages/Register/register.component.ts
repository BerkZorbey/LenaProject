import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from '../../Models/userregister.model';
import { UserResponseModel } from '../../Models/userResponse.model';

import { UserService } from '../../Services/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  public UserModel: UserRegister = {
    UserName: undefined,
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
  constructor(
    private formBuilder: FormBuilder, private userService: UserService, private messageService: MessageService, private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.Token = localStorage.getItem("userToken");
  }

  error = () => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${this.ResponseModel.message}` })
  }
  success = () => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Register' })
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.UserModel.UserName = this.f['username'].value
    this.UserModel.Email = this.f['email'].value;
    this.UserModel.Password = this.f['password'].value

    this.userService.register(this.UserModel).subscribe(
      res => {
        this.ResponseModel.message = res.message;
        this.ResponseModel.statusCode = res.statusCode;
        this.ResponseModel.success = res.success;
        if (res.success == true) {
          this.success();
          setTimeout(() => { this.router.navigate(['/'], { relativeTo: this.route }); }, 1500);
          
        }
        else {
          this.error();
        }

      });
  }
}
