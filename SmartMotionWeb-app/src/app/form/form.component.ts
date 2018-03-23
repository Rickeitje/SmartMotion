import { Component } from '@angular/core';

import { Info }    from '../info';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private http: HttpClient){
  } 

  utc = new Date().toISOString().slice(0, 19).replace('T', ' ');
  model = new Info(30,18,21,this.utc);     
  
  submitted = false;
  onSubmit() { this.submitted = true; this.sendData(); }

  sendData() {
    this.http.post('http://192.168.11.25:42069/sendvalues',this.model).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  } 
}