import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  constructor(private service: ApiserviceService, private toastr: ToastrService, private router: ActivatedRoute, private navigate: Router) {}

  passwordResetForm = new FormGroup({
    'n_password': new FormControl('', Validators.required),
    'c_password': new FormControl('', Validators.required)
  });

  data: any = {};

  updatePassword() {
    if(this.passwordResetForm.valid) {
      if(this.passwordResetForm.value.n_password === this.passwordResetForm.value.c_password) {
        this.data = {
          'n_password': this.passwordResetForm.value.n_password,
          'token': this.router.snapshot.paramMap.get('id')
        }
        this.service.changePassword(this.data).subscribe((res) => {
          if(res.Status === 'Success') {
            this.toastr.success(res.Message);
            this.navigate.navigateByUrl('');
          } else {
            this.toastr.error(res.Message);
          }
        })
        console.log(this.data);
      } else {
        this.toastr.warning('Password Doesn\'t Match', 'Match Error !');
      }
    } else {
      this.toastr.warning('All Fields Required', 'Warning !');
    }
  }
}
