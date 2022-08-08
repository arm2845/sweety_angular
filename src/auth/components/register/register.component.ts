import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {changePassVisibility} from "../../helpers/change-pass-visibility-helper";
import {AuthService} from "../../services/auth.service";
import {UserAuthData} from "../../interfaces/user-auth-data";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.initRegisterForm();
    }

    initRegisterForm(): void {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            phone: ['', Validators.required],
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required],
        })
    }

    showHidePass(event: Event, id: string): void {
        changePassVisibility(event.target, id);
    }

    registerUser() {
        this.authService.register(this.getRegisterFormData())
            .subscribe();
    }

    private getRegisterFormData(): UserAuthData {
        return this.registerForm.getRawValue();
    }

}
