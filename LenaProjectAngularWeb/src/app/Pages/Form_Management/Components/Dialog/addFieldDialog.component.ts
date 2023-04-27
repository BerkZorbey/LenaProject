import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CreateForm } from '../../../../Models/createForm.model';
import { DataTypes } from '../../../../Models/enum.model';
import { Field } from '../../../../Models/field.model';
import { FormResponseModel } from '../../../../Models/formResponse.model';
import { FormService } from '../../../../Services/form.service';
import { FormDialogComponent } from './formOperationsDialog.component';
interface FormId {
  id: number
}

@Component({
  selector: 'app-addField-dialog',
  templateUrl: 'addFieldDialog.component.html',
})
export class AddFieldComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
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

  public FieldModel: Field = {
    DataType : undefined,
    FormId : undefined,
    Id : undefined,
    Name:undefined,
    Required:undefined
  }


  error = () => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `Fail! Field not added.` })
  }
  success = () => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Field Added' })
  }


  constructor(private dialog: MatDialog,private formService: FormService, private formBuilder: FormBuilder, private messageService: MessageService, private router: Router,
    private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: FormId) { }

  ngOnInit() {
      
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      dataType: ['', Validators.required],
      required: ['', Validators.required]
    });
    this.Token = localStorage.getItem("userToken");
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.FieldModel.Name = this.f['name'].value;
    this.FieldModel.DataType = this.f['dataType'].value;
    this.FieldModel.Required = this.f['required'].value;
    this.FieldModel.FormId = this.data.id;
    this.formService.addField(this.FieldModel).subscribe(
      res => {
        this.ResponseModel.message = res.message;
        this.ResponseModel.statusCode = res.statusCode;
        this.ResponseModel.success = res.success;
        if (res.success == true) {
          this.success();
          setTimeout(() => { this.dialog.ngOnDestroy();
        }, 1500);

        }
        else {
          this.error();
        }

      });
  }

}
