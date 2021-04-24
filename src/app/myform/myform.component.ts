import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {firstAndLastNameMatchValidator, numberRangeValidator, userNameComplexityValidator} from './registration.validator';
import {RegisterFormData} from './registerformdata.interface';
import {debounceTime, filter, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css']
})
export class MyformComponent implements OnInit {

  myForm: FormGroup;
  formSubmits: RegisterFormData[] = [];
  REQ_CHAR = 30;
  public descriptionLength = this.REQ_CHAR;


  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.createMyForm();
  }

  createMyForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.group({
        first: [null,
          [Validators.required, Validators.minLength(2), userNameComplexityValidator]],
        last: [null,
          [Validators.required, Validators.minLength(2), userNameComplexityValidator]]
      }, {validators: firstAndLastNameMatchValidator}),
      email: [null, [Validators.required, Validators.email]],
      age: [null, [Validators.required, numberRangeValidator(18, 60)]],
      bio: [null, [Validators.required, Validators.minLength(30)]]
    });
  }


  ngOnInit(): void {

    // 3
    this.myForm.disable();
    setTimeout(() => {
      this.myForm.enable();
    }, 1000);

    // 4
    this.first?.valueChanges
      .pipe(
        debounceTime(5000),    //throotleTime
        filter((name) => typeof name === 'string'),
        map((name) =>
          name?.charAt(0).toUpperCase() + name?.slice(1))
      )
      .subscribe(value => {
          console.log('value', value);
          this.first.patchValue(value);
        }
      );

    this.last?.valueChanges
      .pipe(
        debounceTime(5000),
        filter((name) => typeof name === 'string'),
        map((name) =>
          name?.charAt(0).toUpperCase() + name?.slice(1))
      )
      .subscribe(value => {
          console.log('value', value);
          this.last.patchValue(value);
        }
      );

    // 5
    this.bio?.valueChanges
      .pipe(
        filter((name) => typeof name === 'string'),
      )
      .subscribe(value => {
          if (value.length <= this.REQ_CHAR) {
            this.descriptionLength = this.REQ_CHAR - value.length;
          }
        }
      );
  }


  onSubmit(): void {
    console.log('this.myForm', this.myForm.value);
    this.formSubmits.push(this.myForm.value);
    this.myForm.reset();
    console.log('formsubmits', this.formSubmits);
  }

  get name(): AbstractControl | null {
    return this.myForm.get('name');
  }

  get first(): AbstractControl | null {
    return this.name.get('first');
  }

  get last(): AbstractControl | null {
    return this.name.get('last');
  }

  get bio(): AbstractControl | null {
    return this.myForm.get('bio');
  }

}
