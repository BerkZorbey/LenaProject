import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './Dialog/formOperationsDialog.component';
import { Form } from '../../../Models/form.model';
import { FormService } from '../../../Services/form.service';
import { FormResponseModel } from '../../../Models/formResponse.model';



@Component({
  selector: 'app-form-grid',
  templateUrl: './formGrid.component.html',
  styleUrls: ['./formGrid.component.css']
})


export class FormGridComponent {
  public data: any;

  public columnDefs: ColDef[] = [
    { headerName: 'Id', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'CreatedAt', field: 'createdAt' }
  ];

  
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  
  public FormModel: Form = {
    CreatedAt: undefined,
    Description: undefined,
    Name: undefined,
    Id: undefined,
    UserId: undefined,
    Fields: undefined,
    CreatedBy: undefined
  };
  

  constructor(private httpClient: HttpClient, private dialog: MatDialog, private formService: FormService) {

  }

  public userId!: any;
  
  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  public onGridReady(params: GridReadyEvent) {
    this.userId = localStorage.getItem("userId");
    this.rowData$ = this.formService.getForms(this.userId);
    this.agGrid.api.sizeColumnsToFit();
  }
  onRowClicked(event: any) {
    this.openDialog(event);
  }


  openDialog(event: any) {
    this.dialog.open(FormDialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        id: 1
      }
    });
  }




}
