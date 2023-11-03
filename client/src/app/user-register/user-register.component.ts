import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import * as zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  errormsg: any = 'All Fields are required';
  score: any;
  password: any;

  useForm = new FormGroup({
    user_id: new FormControl(uuidv4(), Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    user_password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    user_email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
  });

  createUser() {
    if (this.useForm.valid) {
      this.password = this.useForm.value.user_password;
      this.score = zxcvbn(this.password).score;
      if (this.score === 4) {
        this.service.createUser(this.useForm.value).subscribe((res) => {
          if (res.Status === 'Success') {
            this.route.navigateByUrl('');
            this.useForm.reset();
            this.toastr.success(res.Message, 'Success');
          } else {
            this.toastr.warning(res.Message, 'Error');
          }
        });
      } else {
        this.toastr.warning('Password Must be Strong', 'Password Strength');
      }
    } else {
      this.toastr.warning(this.errormsg, 'Incomplete Data');
    }
  }
}
