import { Component } from '@angular/core';

import { Info }    from '../info';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  model = new Info(30,18,21);

  submitted = false;

  onSubmit() { this.submitted = true; console.log(JSON.stringify(this.model)); }
 
}