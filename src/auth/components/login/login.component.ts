import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {changePassVisibility} from "../../helpers/change-pass-visibility-helper";
import { AuthService } from "../../services/auth.service";
import { tap } from "rxjs";
import { UserAuthData } from "../../interfaces/user-auth-data";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  showHidePass(event: any, id: string): void {
    changePassVisibility(event.target, id);
  }

  login() {
    this.authService.login(this.getLoginFormData()).pipe(
      tap((res) => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard/menu/1']);
      })
    )
      .subscribe()
  }

  private getLoginFormData(): UserAuthData {
    return {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    }
  }

}
