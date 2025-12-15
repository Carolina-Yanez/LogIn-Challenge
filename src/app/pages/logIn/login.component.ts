import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ValidationService } from "../../services/validation.service";
import { AuthService } from "../../services/auth.service";

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

    ingresar() {
        if (this.actorForm.valid) {
            const { email, password, isAdminLogin } = this.actorForm.value;

            this.authService.login(email, password, isAdminLogin)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/dashboard'])
                    },
                    error: (err) => {
                        console.error("Error:", err);
                    }
                });
        }
    }
}
