import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegister } from '../Models/userregister.model';
import { FormResponseModel } from '../Models/formResponse.model';
import { Header } from 'primeng/api';
import { Form } from '../Models/form.model';
import { CreateForm } from '../Models/createForm.model';
import { Field } from '../Models/field.model';
import { FormProperty } from '../Models/formProperty.model';



@Injectable({ providedIn: 'root' })
export class FormService {
  public token!: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {

  }
  

  getForms(userId: string | null) {
    this.token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.get<Form[]>('api/forms/' + userId, { headers: headers });
  }

  

  createForm(form: CreateForm) {
    this.token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post<FormResponseModel>('api/create', JSON.stringify(form), { headers: headers });
  }
  addField(field: Field) {
    this.token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post<FormResponseModel>('api/form/addField/' + field.FormId, JSON.stringify(field), { headers: headers });
  }
  changeFormProperty(FormId: number, FormProperty: FormProperty) {
    this.token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.put<FormResponseModel>('api/form/' + FormId, JSON.stringify(FormProperty), { headers: headers });
  }
  getFormById(FormId: number) {
    this.token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.get<FormResponseModel>('api/form/' + FormId, { headers: headers });
  }

  deleteField(Field: Field) {
    this.token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.delete<FormResponseModel>('api/' + Field.FormId +'/'+ Field.Id, { headers: headers });
  }
}
