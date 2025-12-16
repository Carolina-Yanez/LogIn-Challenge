import { Component, signal } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ValidationService } from "../../services/validation.service";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [RouterLink, ReactiveFormsModule]
})

export class loginPageComponent {
    actorForm: FormGroup

    constructor(private validationService: ValidationService, private authService: AuthService, private router: Router) {
        this.actorForm = this.validationService.createLoginForm()
    }

    error = signal<string | null>(null)

    ingresar() {
        if (this.actorForm.valid) {
            // Limpiar errores anteriores
            this.error.set(null);
            
            const { email, password, isAdminLogin } = this.actorForm.value;

            this.authService.login(email, password, isAdminLogin)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/dashboard'])
                    },
                    error: (errorResponse: HttpErrorResponse) => {
                        this.handleLoginError(errorResponse);
                    }
                });
        } else {
            // Marcar todos los campos como tocados para mostrar errores de validación
            this.actorForm.markAllAsTouched();
        }
    }

    private handleLoginError(errorResponse: HttpErrorResponse): void {
        let errorMessage = '';

        switch (errorResponse.status) {
            case 401:
                errorMessage = '¡Ups! Las credenciales ingresadas no son correctas. Por favor, verifica tu correo electrónico y contraseña.';
                break;
            case 403:
                errorMessage = 'Tu cuenta no tiene permisos para acceder. Si intentas acceder como administrador, verifica tus privilegios.';
                break;
            case 404:
                errorMessage = 'No encontramos una cuenta asociada a este correo electrónico. ¿Quizás necesitas registrarte?';
                break;
            case 500:
                errorMessage = 'Estamos experimentando problemas técnicos. Por favor, intenta nuevamente en unos minutos.';
                break;
            case 0:
                errorMessage = 'No se puede conectar con el servidor. Verifica tu conexión a internet.';
                break;
            default:
                // Intentar usar el mensaje del servidor si existe
                if (errorResponse.error?.message) {
                    errorMessage = errorResponse.error.message;
                } else {
                    errorMessage = 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
                }
                break;
        }

        this.error.set(errorMessage);
    }
}
