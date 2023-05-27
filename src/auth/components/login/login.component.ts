import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {changePassVisibility} from "../../helpers/change-pass-visibility-helper";
import {AuthService} from "../../services/auth.service";
import {UserAuthData} from "../../interfaces/user-auth-data";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.initLoginForm();
    }

    showHidePass(event: Event, id: string): void {
        changePassVisibility(event.target, id);
    }

    login(): void {
        this.authService.login(this.getLoginFormData())
            .subscribe()
    }

    private initLoginForm(): void {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    private getLoginFormData(): UserAuthData {
        return this.loginForm.getRawValue();
    }

}
