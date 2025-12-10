import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { user } from "../../interfaces/user.interface";

@Component({
    templateUrl:'./signup.component.html',
    styleUrls: ['./singup.component.css'],
    imports: [RouterLink]
})

export class signUpPageComponent {
    name = signal('')
    email = signal('')
    password = signal('')

    registrar() {
        const newUser: user = {
            name: this.name(),
            email: this.email()
        }

        //Prueba vista de datos
        console.log(newUser)
    }
}
