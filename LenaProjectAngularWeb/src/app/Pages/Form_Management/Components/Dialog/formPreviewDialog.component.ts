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
import { Form } from '../../../../Models/form.model';
import { FormProperty } from '../../../../Models/formProperty.model';
import { FormResponseModel } from '../../../../Models/formResponse.model';
import { FormService } from '../../../../Services/form.service';
import { FormDialogComponent } from './formOperationsDialog.component';
interface FormId {
  id: number
}

@Component({
  selector: 'app-formPreview-dialog',
  templateUrl: 'formPreviewDialog.component.html',
})
export class FormPreviewComponent implements OnInit {

  form: FormGroup = new FormGroup({
    field: new FormControl('')
  });
  submitted = false;
 

  public FormModel: Form = {
    Id:undefined,
    Name: undefined,
    Fields: undefined,
    UserId: undefined,
    Description: undefined,
    CreatedAt: undefined,
    CreatedBy:undefined
  }

  constructor(private dialog: MatDialog, private formService: FormService, private formBuilder: FormBuilder, private messageService: MessageService, private router: Router,
    private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: FormId) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      field: ['', Validators.required],
    });
    this.formService.getFormById(this.data.id).subscribe(
      res => {
        this.FormModel.Id = res.model.id;
        this.FormModel.Name = res.model.name;
        this.FormModel.UserId = res.model.userId;
        this.FormModel.Description = res.model.description;
        this.FormModel.CreatedAt = res.model.createdAt;
        this.FormModel.CreatedBy = res.model.createdBy;
        this.FormModel.Fields = res.model.fields;

      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.FormModel.Fields = this.f['field'].value;


  }

  

}
