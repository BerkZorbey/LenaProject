import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CreateForm } from '../../../../Models/createForm.model';
import { DataTypes } from '../../../../Models/enum.model';
import { Field } from '../../../../Models/field.model';
import { FormResponseModel } from '../../../../Models/formResponse.model';
import { FormService } from '../../../../Services/form.service';


@Component({
  selector: 'app-createForm-dialog',
  templateUrl: 'createFormDialog.component.html',
})
export class CreateFormDialogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    dataType: new FormControl(''),
    required: new FormControl('')
  });
  submitted = false;
  public Token!: any;
  public ResponseModel: FormResponseModel = {
    message: undefined,
    model: undefined,
    statusCode: undefined,
    success: undefined
  };




  error = () => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `Fail! Form not created.` })
  }
  success = () => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Form Created' })
  }

  public FormModel: CreateForm = {
    Description: undefined,
    Name: undefined,
    UserId: undefined,
    Fields: undefined,
  };

  constructor(private formService: FormService, private formBuilder: FormBuilder, private messageService: MessageService,private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      fields: this.formBuilder.array<Field>([])
    });
    this.Token = localStorage.getItem("userToken");
  }
  fields(): FormArray {
    return this.form.get("fields") as FormArray
  }

  createFormField(): FormGroup {
      return this.formBuilder.group({
        name: ['', Validators.required],
        dataType: ['', Validators.required],
        required: ['', Validators.required]
      })
    
  }

  addField() {
    
    this.fields().push(this.createFormField());
  }

  removeField(i: number) {
    this.fields().removeAt(i);
  }


  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.FormModel.Name = this.f['name'].value;
    this.FormModel.Description = this.f['description'].value;
    this.FormModel.UserId = localStorage.getItem("userId");
    this.FormModel.Fields = this.f['fields'].value;
    this.formService.createForm(this.FormModel).subscribe(
      res => {
        this.ResponseModel.message = res.message;
        this.ResponseModel.statusCode = res.statusCode;
        this.ResponseModel.success = res.success;
        if (res.success == true) {
          this.success();
          setTimeout(() => { this.router.navigate(['/form-management'], { relativeTo: this.route }); }, 1500);

        }
        else {
          this.error();
        }

      });
  }

}
