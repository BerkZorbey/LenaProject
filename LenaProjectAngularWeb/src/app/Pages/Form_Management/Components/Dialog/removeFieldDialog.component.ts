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

interface FormId {
  id: number
}
@Component({
  selector: 'app-removeField-dialog',
  templateUrl: 'removeFieldDialog.component.html',
})
export class RemoveFieldComponent implements OnInit {

  form: FormGroup = new FormGroup({
    fieldId: new FormControl(''),
    
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
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `Fail! Field not deleted.` })
  }
  success = () => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Field Deleted' })
  }

  public FieldModel: Field = {
    DataType: undefined,
    FormId: undefined,
    Id: undefined,
    Name: undefined,
    Required:undefined
  };

  constructor(private dialog: MatDialog,private formService: FormService, private formBuilder: FormBuilder, private messageService: MessageService, private router: Router,
    private route: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: FormId) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      fieldId: ['', Validators.required]
    });
    this.Token = localStorage.getItem("userToken");
  }




  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.FieldModel.Id = this.f['fieldId'].value;
    this.FieldModel.FormId = this.data.id;

    this.formService.deleteField(this.FieldModel).subscribe(
      res => {
        this.ResponseModel.message = res.message;
        this.ResponseModel.statusCode = res.statusCode;
        this.ResponseModel.success = res.success;
        if (res.success == true) {
          this.success();
          setTimeout(() => { this.dialog.ngOnDestroy() }, 1500);

        }
        else {
          this.error();
        }

      });
  }

}
