import { Component, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ValidationService } from "../../services/validation.service";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    templateUrl:'./signup.component.html',
    styleUrls: ['./singup.component.css'],
    imports: [RouterLink, ReactiveFormsModule]
})

export class signUpPageComponent {
    actorForm: FormGroup

    constructor(private validationService: ValidationService, private authService: AuthService, private router: Router){
        this.actorForm = this.validationService.createRegisterForm()
    }

    error = signal<string | null>(null)

     registrar() {
        if (this.actorForm.valid) {
            this.error.set(null) // Limpiar errores previos
            const {name, email, password} = this.actorForm.value
            
            this.authService.register(name, email, password).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard'])
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 409) {
                        this.error.set('Ya existe una cuenta con este correo electrónico')
                    } else if (error.status === 500) {
                        this.error.set('Error interno del servidor. Intenta nuevamente más tarde.')
                    } else if (error.status === 0) {
                        this.error.set('No se pudo conectar con el servidor. Verifica tu conexión.')
                    } else {
                        this.error.set('Ha ocurrido un error inesperado. Por favor intenta nuevamente.')
                    }
                }
            })
        } else {
            this.error.set('Por favor completa todos los campos correctamente')
        }
    }
}
