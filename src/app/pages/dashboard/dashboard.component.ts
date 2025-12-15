import { Component, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { MetricsService, UserMetrics, AdminMetrics } from "../../services/metrics.service";
import { EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
    templateUrl:'./dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [CommonModule]
})
export class DashboardComponent implements OnInit{
    user: any;
    loading = signal(true)
    error = signal<string | null>(null)
    userMetrics = signal<UserMetrics | null>(null)
    adminMetrics = signal<AdminMetrics | null>(null)
    isAdmin = signal(false)

    constructor(
        private auth: AuthService,
        private metricsService: MetricsService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.user = this.auth.getCurrentUser();
        
        // Determinar si es admin basado en el rol del usuario
        if (this.user?.role === 'ADMIN') {
            this.isAdmin.set(true);
        }
        
        this.loadMetrics();
    }

    loadMetrics(): void {
        this.loading.set(true)
        this.error.set(null)

        // Cargar métricas según el rol del usuario
        if (this.user?.role === 'ADMIN') {
            this.metricsService.getAdminMetrics().pipe(
                catchError((error) => {
                    console.error('Admin metrics error:', error);
                    this.error.set('Error loading admin data');
                    return EMPTY;
                }),
                finalize(() => this.loading.set(false))
            ).subscribe({
                next: (data: AdminMetrics) => {
                    this.adminMetrics.set(data);
                }
            });
        } else {
            this.metricsService.getUserMetrics().pipe(
                catchError((error) => {
                    console.error('User metrics error:', error);
                    this.error.set('Error loading user data');
                    return EMPTY;
                }),
                finalize(() => this.loading.set(false))
            ).subscribe({
                next: (data: UserMetrics) => {
                    this.userMetrics.set(data);
                }
            });
        }
    }

    logout(): void{
        this.auth.logout();
        this.router.navigate(['/']);
    }

    formatDate(dateString: string): string {
        return new Date(dateString).toLocaleString();
    }
}
