import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu.component';
import { FormDialogComponent } from './Pages/Form_Management/Components/Dialog/formOperationsDialog.component';
import { FormGridComponent } from './Pages/Form_Management/Components/formGrid.component';
import { FormManagementComponent } from './Pages/Form_Management/formManagement.component';
import { LoginComponent } from './Pages/Login/login.component';
import { RegisterComponent } from './Pages/Register/register.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CreateFormDialogComponent } from './Pages/Form_Management/Components/Dialog/createFormDialog.component';
import { AddFieldComponent } from './Pages/Form_Management/Components/Dialog/addFieldDialog.component';
import { ChangeFormPropertyComponent } from './Pages/Form_Management/Components/Dialog/changeFormPropertyDialog.component';
import { FormPreviewComponent } from './Pages/Form_Management/Components/Dialog/formPreviewDialog.component';
import { RemoveFieldComponent } from './Pages/Form_Management/Components/Dialog/removeFieldDialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FormGridComponent, FormDialogComponent, FormManagementComponent,
    LoginComponent, RegisterComponent, CreateFormDialogComponent,
    AddFieldComponent, ChangeFormPropertyComponent, FormPreviewComponent,
    RemoveFieldComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AgGridModule, MatDialogModule, ReactiveFormsModule, ToastModule, BrowserAnimationsModule, AutoCompleteModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'form-management', component: FormManagementComponent },
      { path: 'register', component: RegisterComponent },
    ])
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }


