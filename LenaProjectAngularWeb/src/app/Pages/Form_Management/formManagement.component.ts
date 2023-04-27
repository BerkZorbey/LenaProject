import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateFormDialogComponent } from './Components/Dialog/createFormDialog.component';
import { FormDialogComponent } from './Components/Dialog/formOperationsDialog.component';


@Component({
  selector: 'app-form-management',
  templateUrl: './formManagement.component.html',
  styleUrls: ['./formManagement.component.css']
})

export class FormManagementComponent implements OnInit {
  public data: any;
  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    var token = localStorage.getItem("userToken");
    if (token == null) {
      this.router.navigate(['/'], { relativeTo: this.route }); 
    }
  }
  openCreateFormDialog() {
    this.dialog.open(CreateFormDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }

  openFormOperationsDialog() {
    this.dialog.open(FormDialogComponent, {
      height: '400px',
      width: '600px',
      //data: {
      //  id: event?.data.id
      //}
    });
  }

}
