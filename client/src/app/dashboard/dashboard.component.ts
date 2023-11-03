import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router, private toastr: ToastrService) {}

  DP: any = '../../assets/images/cym.jpeg';
  Logo: any = '../../assets/images/PRMS.png';
  profileName: any = localStorage.getItem('email');

  logOut() {
    localStorage.clear();
    setTimeout(() => {
      this.toastr.success('Looged out Successful', 'Bye !');
      this.router.navigateByUrl('');
    },1000)
  }
}