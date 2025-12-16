import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { MetricsService, UserMetrics, AdminMetrics } from "../../services/metrics.service";
import { EMPTY, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SessionExpire } from "../../services/sessionExpire.service";
import { SessionExpiredModalComponent } from "../../components/modal/modal.component";

@Component({
    templateUrl:'./dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [CommonModule, SessionExpiredModalComponent]
})
export class DashboardComponent implements OnInit, OnDestroy{
    user: any;
    loading = signal(true)
    error = signal<string | null>(null)
    userMetrics = signal<UserMetrics | null>(null)
    adminMetrics = signal<AdminMetrics | null>(null)
    isAdmin = signal(false)

    showSessionModal = signal(false)
    private sub?: Subscription

    constructor(
        private auth: AuthService,
        private metricsService: MetricsService,
        private router: Router,
        private sessionExpire: SessionExpire
    ){}

    ngOnInit(): void {
        this.user = this.auth.getCurrentUser();
        
        // Determinar si es admin basado en el rol del usuario
        if (this.user?.role === 'ADMIN') {
            this.isAdmin.set(true);
        }
        
        this.loadMetrics();
        this.sessionExpire.startWatching()

        this.sub = this.sessionExpire.sessionExpired.subscribe(() =>{
            this.showSessionModal.set(true)
        })
    }

    ngOnDestroy(){
        this.sessionExpire.stopWatching()
        this.sub?.unsubscribe()
    }

    confirmSessionExpired(){
        this.auth.logout()
        this.showSessionModal.set(false)
        this.router.navigate(['/'])
    }

    loadMetrics(): void {
        this.loading.set(true)
        this.error.set(null)

        // Cargar métricas según el rol del usuario
        if (this.user?.role === 'ADMIN') {
            this.metricsService.getAdminMetrics().pipe(
                catchError(() => {
                    this.error.set('Ha ocurrido un error, vuelva a intentarlo mas tarde');
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
                catchError(() => {
                    this.error.set('Ha ocurrido un error, vuelva a intentarlo mas tarde');
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
