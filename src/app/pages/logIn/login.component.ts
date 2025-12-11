import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ValidationService } from "../../services/validation.service";
import { user } from "../../interfaces/user.interface";

@Component({
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [RouterLink, ReactiveFormsModule]
})

export class loginPageComponent {
    actorForm: FormGroup

    constructor(private validationService: ValidationService){
        this.actorForm = this.validationService.createLoginForm()
    }

    ingresar() {
        if (this.actorForm.valid) {
            console.log('Validación exitosa');
        }
    }
}
