import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  baseURL:string="http://localhost:8888";
  constructor(public httpObj:HttpClient) { }
  
  getRecord(tableName:any){
    return this.httpObj.get(`${this.baseURL}/${tableName}`)
  }
  deleteRecord(tableName:any,id:any){
    return this.httpObj.delete(`${this.baseURL}/${tableName}/${id}`)
  }
  addRecord(tableName:any,body:any){
    return this.httpObj.post(`${this.baseURL}/${tableName}`,body);
  }
  getSingleRecord(tableName:any,id:any){
    return this.httpObj.get(`${this.baseURL}/${tableName}/${id}`)
  }
  updateRecord(tableName:any,id:any,body:any){
    return this.httpObj.put(`${this.baseURL}/${tableName}/${id}`,body)
  }
}