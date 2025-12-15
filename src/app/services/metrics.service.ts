import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserMetrics {
  name: string;
  email: string;
  role: string;
  counterLogin: number;
  lastLogin: Date;
}

export interface AdminMetrics {
  user: {
    name: string;
    email: string;
    role: string;
    counterLogIn: number;
    lastLogIn: Date;
  };
  totalUsers: number;
  users: Array<{
    name: string;
    email: string;
    role: string;
    counterLogin: number;
    lastLogin: Date;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private readonly API_URL = 'http://localhost:3000/api/metrics';

  constructor(private http: HttpClient) {}

  getUserMetrics(): Observable<UserMetrics> {
    return this.http.get<UserMetrics>(`${this.API_URL}/user`);
  }

  getAdminMetrics(): Observable<AdminMetrics> {
    return this.http.get<AdminMetrics>(`${this.API_URL}/admin`);
  }
}
