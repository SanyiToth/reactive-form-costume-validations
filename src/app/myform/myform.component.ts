import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {firstAndLastNameMatchValidator, numberRangeValidator, userNameComplexityValidator} from './registration.validator';


@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css']
})
export class MyformComponent implements OnInit {

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.createMyForm();
  }

  createMyForm(): FormGroup {
    return this.formBuilder.group({
      userName: this.formBuilder.group({
        firstName: [null,
          [Validators.required, Validators.minLength(2), userNameComplexityValidator]],
        lastName: [null,
          [Validators.required, Validators.minLength(2), userNameComplexityValidator]]
      }, {validators: firstAndLastNameMatchValidator}),
      email: [null, [Validators.required, Validators.email]],
      age: [null, [Validators.required, numberRangeValidator(18, 60)]]
    });
  }


  ngOnInit(): void {
  }

  onSubmit(): void {

  }

}
