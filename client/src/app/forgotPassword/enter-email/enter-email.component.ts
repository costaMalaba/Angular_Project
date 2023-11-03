import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.scss']
})
export class EnterEmailComponent {

  constructor(private service: ApiserviceService, private toastr: ToastrService, private router: Router) {}

  resetForm = new FormGroup({
    'user_email': new FormControl('', Validators.required)
  });

  sendLink() {
    if(this.resetForm.valid) {
      this.service.sendRestPasswordLink(this.resetForm.value).subscribe((res) => {
        if(res.Status === 'Success') {
          this.toastr.success(res.Message, 'Success !');
          setTimeout(() => {
            this.router.navigateByUrl('');
          },500)
        } else {
          this.toastr.error(res.Message, 'Error !');
        }
      })
    } else {
      this.toastr.warning('Email is Required', 'Warning !');
    }
  }
}
