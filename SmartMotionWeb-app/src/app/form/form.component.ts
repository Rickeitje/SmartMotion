import { Component } from '@angular/core';
import { Info }    from '../info';

import {CdkTableModule} from '@angular/cdk/table'

import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  displayedColumns=['index','timeout','maxtemp','mintemp'];
  settingslogs = "";
  jsonresponse;
  dataSource : null;
  dataValues : null;

  ngOnInit(): void {
    this.http.get('http://192.168.178.234:42069/getsettingslog').subscribe(
      res => {
        this.jsonresponse = res;
        console.log(res);
        this.parseTime();
        this.dataSource = this.jsonresponse.response;
      },
      err => {
        console.log(err);
      }
    );

    this.http.get('http://192.168.178.234:42069/getvalues').subscribe(
      res => {
        this.jsonresponse = res;
        console.log(res);
        this.parseTime();
        this.dataValues = this.jsonresponse.response;
      },
      err => {
        console.log(err);
      }
    );
  }

  constructor(private http: HttpClient){
  } 

  utc = new Date().toISOString().slice(0, 19).replace('T', ' ');
  model = new Info(30,18,21,this.utc);     
  
  submitted = false;
  onSubmit() { this.submitted = true; this.sendData(); }

  sendData() {
    this.http.post('http://192.168.178.234:42069/sendsettings',this.model).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  
  parseTime(){
    for(var j in this.jsonresponse.response){
       this.jsonresponse.response[j].time = this.jsonresponse.response[j].time.slice(0,19).replace('T',' ');
    }
  }
}
