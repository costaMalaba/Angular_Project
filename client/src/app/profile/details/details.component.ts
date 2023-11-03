import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  DP: any = '../../assets/images/cym.jpeg';

  constructor(private service: ApiserviceService) {}

  user: any = [];
  date: any;
  user_email: any = localStorage.getItem('email');

  ngOnInit(): void {
    this.service.getSingleUser(this.user_email).subscribe((res => {
      this.user = res.Result[0];
      this.date = moment(this.user.dob).format('DD / MM / YYYY')
    }))
  }
}
