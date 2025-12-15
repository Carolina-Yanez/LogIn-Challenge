import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ValidationService } from "../../services/validation.service";
import { AuthService } from "../../services/auth.service";

@Component({
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [RouterLink, ReactiveFormsModule]
})

export class loginPageComponent {
    actorForm: FormGroup

    constructor(private validationService: ValidationService, private authService: AuthService) {
        this.actorForm = this.validationService.createLoginForm()
    }

    ingresar() {
        if (this.actorForm.valid) {
            const { email, password } = this.actorForm.value;

            this.authService.login(email, password)
                .subscribe({
                    next: (res) => {
                        console.log("Login OK:", res);
                    },
                    error: (err) => {
                        console.error("Error:", err);
                    }
                });
        }
    }
}
