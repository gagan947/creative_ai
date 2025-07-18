import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiUrl = 'http://192.168.29.241:4000/';
  apiUrl = 'https://creativethoughts.ai:4000/';
  // apiUrl = 'http://localhost:4000/';
  // imageUrl = 'https://98.80.36.64:5000/images/';
  imageUrl = 'http://192.168.29.241:4000/images/';

  private clearInputSubject = new Subject<void>();

  constructor(private http: HttpClient, private route: Router) { }

  getApi<T>(url: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + url);
  };

  deleteApi<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url);
  };

  getApiNoCache<T>(url: string): Observable<T> {
    const headers = new HttpHeaders({ 'X-Bypass-Cache': 'true' });
    return this.http.get<T>(this.apiUrl + url, { headers });
  }

  isLogedIn() {
    return this.getToken() !== null;
  }

  postAPI<T, U>(url: string, data: U): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, data)
  };


  setToken(token: string) {
    localStorage.setItem('tokenCTi', token);
  };

  getToken() {
    return localStorage.getItem('tokenCTi');
  };

  getUserId() {
    return localStorage.getItem('userIdA');
  };

  logout() {
    localStorage.removeItem('tokenCTi');
    localStorage.removeItem('userDetailAuc');
    this.route.navigateByUrl('/');
  };

  private dataKey = 'auctionData';

  setProduct(data: any) {
    localStorage.setItem('auctionProducts', JSON.stringify(data));
  }

  getProduct() {
    const data = localStorage.getItem('auctionProducts');
    return data ? JSON.parse(data) : null;
  };

  clearProducts() {
    localStorage.removeItem('auctionProducts');
  };

  private offersSubject = new Subject<any>();
  offers$ = this.offersSubject.asObservable();

  sendOffers(offers: any) {
    this.offersSubject.next(offers);
  }

  // Observable that components can subscribe to
  clearInput$ = this.clearInputSubject.asObservable();

  // Method to trigger the clear event
  triggerClearInput() {
    this.clearInputSubject.next();
  }

  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  updateUserDetail(userDetails: any) {
    this.userDataSubject.next(userDetails)
  }
}
