import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(
    private servive: ApiserviceService,
    private toastr: ToastrService
  ) {}

  text: string = 'Are you sure you want to delete that data';
  users: any = [];
  date: any = [];
  user_email: any = localStorage.getItem('email');

  ngOnInit(): void {
    this.servive.getAllUsers(this.user_email).subscribe((res) => {
      try {
        if (res.Status === 'Success') {
          this.users = res.Result;
          this.date = moment(this.users.createdAt).format('DD-MM-YYYY');
        } else {
          this.toastr.error(res.Message, 'Error !');
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  deleteUser(id: any, name: string) {
    if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
      try {
        this.servive.deleteUserAc(id).subscribe((res) => {
          if (res.Status === 'Success') {
            this.toastr.success(res.Message);

            this.servive.getAllUsers(this.user_email).subscribe((res) => {
              this.users = res.Result;
            })
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
