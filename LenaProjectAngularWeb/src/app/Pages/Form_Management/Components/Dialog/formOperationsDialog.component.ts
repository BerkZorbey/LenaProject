import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormService } from '../../../../Services/form.service';
import { AddFieldComponent } from './addFieldDialog.component';
import { ChangeFormPropertyComponent } from './changeFormPropertyDialog.component';
import { FormPreviewComponent } from './formPreviewDialog.component';
import { RemoveFieldComponent } from './removeFieldDialog.component';


interface FormId {
  id: number
}

@Component({
  selector: 'app-operation-dialog',
  templateUrl: 'formOperationsDialog.component.html',
  styleUrls: ['./formOperationsDialog.component.css']
})
export class FormDialogComponent implements OnInit {
  public formId!: number;

  constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: FormId, private formService: FormService) { }
  ngOnInit() {
    this.formId = this.data.id;
  }

  addField() {
    this.dialog.ngOnDestroy();
    this.dialog.open(AddFieldComponent, {
      height: '400px',
      width: '600px',
      data: {
        id: this.formId
      }
    });
  }
  changeFormProperty() {
    this.dialog.ngOnDestroy();
    this.dialog.open(ChangeFormPropertyComponent, {
      height: '330px',
      width: '600px',
      data: {
        id: this.formId
      }
    });
  }
  formPreview() {
    this.dialog.ngOnDestroy();
    this.dialog.open(FormPreviewComponent, {
      height: '400px',
      width: '600px',
      data: {
        id: this.formId
      }
    });
  }
  removeField() {
    this.dialog.ngOnDestroy();
    this.dialog.open(RemoveFieldComponent, {
      height: '330px',
      width: '600px',
      data: {
        id: this.formId
      }
    });
  }


}
