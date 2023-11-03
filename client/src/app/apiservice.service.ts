import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:8800';

  logIn(crededintials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/auth`, crededintials);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/add`, data);
  }

  getAllUsers(email: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/view?email=${email}`);
  }

  getSingleUser(email: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/view/${email}`);
  }

  editUserInfo(data: any, email: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/edit/${email}`, data);
  }

  deleteUserAc(user_id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/delete/${user_id}`);
  }

  sendRestPasswordLink(email: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/resetpassword`, email);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/updatepassword`, data);
  }
}
