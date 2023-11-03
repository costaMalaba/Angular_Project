import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  constructor(private service: ApiserviceService, private toastr: ToastrService, private router: Router) {}

  user: any = [];
  date: any;
  email: any = localStorage.getItem('email');

  ngOnInit(): void {
    this.service.getSingleUser(this.email).subscribe((res) => {
      this.user = res.Result[0];
      this.date = moment(this.user.dob).format("YYYY-MM-DD")
      this.userForm.patchValue({
        'first_name': this.user.first_name,
        'last_name': this.user.last_name,
        'user_password': this.user.user_password,
        'gender': this.user.gender,
        'dob': this.user.dob,
        'address': this.user.address,
        'user_email': this.user.user_email,
        'mobile': this.user.mobile
      });
    })
  }

  userForm = new FormGroup({
    'first_name': new FormControl('', Validators.required),
    'last_name': new FormControl('', Validators.required),
    'user_password': new FormControl('', Validators.required),
    'gender': new FormControl('', Validators.required),
    'dob': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
    'user_email': new FormControl('', Validators.required),
    'mobile': new FormControl('', Validators.required)
  });

  editUser(email: any) {
    if(this.userForm.valid) {
      this.service.editUserInfo(this.userForm.value, email).subscribe((res) => {
        if(res.Status === 'Success') {
          this.toastr.success(res.Message);
        } else {
          this.toastr.warning(res.Message);
        }
      })
    } else {
      this.toastr.warning('All Fields Required', 'Warning !');
    }
  }

  deleteAc(user_id: any) {
    if(window.confirm("Are you sure you want to delete your Account")) {
      try {
        this.service.deleteUserAc(user_id).subscribe((res) => {
          if(res.Status === 'Success') {
            this.toastr.success(res.Message, 'Success');
            setTimeout(() => {
              this.router.navigateByUrl('');
              localStorage.clear();
            },5000)
          } else {
            this.toastr.warning(res.Message, 'Warning !');
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
  }
}
