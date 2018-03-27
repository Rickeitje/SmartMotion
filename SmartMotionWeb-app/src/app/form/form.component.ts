import { Component } from '@angular/core';

import { Info }    from '../info';

import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  settingslogs = "";
  jsonresponse;

  ngOnInit(): void {
    this.http.get('http://192.168.178.234:42069/getsettingslog').subscribe(
      res => {
        this.jsonresponse = res;
        console.log(res);
        this.parseJson();

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
  
  parseJson(){
    for(var j in this.jsonresponse.response){
    console.log(j);
    this.settingslogs += this.jsonresponse.response[j].timeout + ' ';
    this.settingslogs += this.jsonresponse.response[j].mintemp + ' ';
    this.settingslogs += this.jsonresponse.response[j].maxtemp + ' ';
    this.settingslogs += this.jsonresponse.response[j].time.slice(0,19).replace('T',' ')    + '<br/>';
    }
  }
}
