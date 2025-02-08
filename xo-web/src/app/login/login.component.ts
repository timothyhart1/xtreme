import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    standalone: true,
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    public async onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        const {email, password} = this.loginForm.value;

        try {
            const result = await this.authService.login(email, password);

            if (result) {
                this.router.navigate(['/events']);
            } else {
                console.error("Invalid login credentials");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }
}
