import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { user } from "../../interfaces/user.interface";
import { FormGroup } from "@angular/forms";
import { ValidationService } from "../../services/validation.service";

@Component({
    templateUrl:'./signup.component.html',
    styleUrls: ['./singup.component.css'],
    imports: [RouterLink, ReactiveFormsModule]
})

export class signUpPageComponent {
    actorForm: FormGroup

    constructor(private validationService: ValidationService){
        this.actorForm = this.validationService.createRegisterForm()
    }

    registrar() {
        if (this.actorForm.valid) {
            const formValue = this.actorForm.value;
            
            const newUser: user = {
                name: formValue.name,
                email: formValue.email,
                password: formValue.password,
                token: '',
                counterLogIn: 0,
                lastLogIn: new Date()
            }

            //Prueba vista de datos
            console.log(`${formValue.password} - ${formValue.confirmPassword}`)
            console.log('Usuario registrado:', newUser);
        }
    }
}
