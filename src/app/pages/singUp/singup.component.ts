import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { user } from "../../interfaces/SignUpUser.interface";
import { FormGroup } from "@angular/forms";
import { ValidationService } from "../../services/validation.service";
import { AuthService } from "../../services/auth.service";

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

    registrar() {
        if (this.actorForm.valid) {
            const {name, email, password} = this.actorForm.value
            
            this.authService.register(name, email, password).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard'])
                },
                error: (err) => {
                    console.log("Error", err);
                }
            })
        }
    }
}
