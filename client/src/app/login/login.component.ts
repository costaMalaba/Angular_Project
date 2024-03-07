import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show().then(() => {
      setTimeout(() => {
        this.spinner.hide();
      }, 8000);
    });   
  }

  errormsg: any;
  successmsg: any;

  userForm = new FormGroup({
    'user_email': new FormControl('', Validators.required),
    'user_password': new FormControl('', Validators.required)
  });

  login() {
    if(this.userForm.valid) {
       this.service.logIn(this.userForm.value).subscribe((res) => {
        if(res.Status === 'Success') {
          localStorage.setItem('email', res.user.user_email)
          setTimeout(() => {
            this.router.navigateByUrl('home');
            this.toastr.success(res.Message, 'Welcome');
          this.userForm.reset();
          },500)
        } else {
          this.toastr.warning(res.Message, 'Warning')
        }
       })
    } else{
      this.errormsg = 'Email and Password are Required !';
      this.toastr.warning(this.errormsg, 'Warning');
    }
  }
}
