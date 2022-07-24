import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {changePassVisibility} from "../../helpers/change-pass-visibility-helper";
import { AuthService } from "../../services/auth.service";
import { UserAuthData } from "../../interfaces/user-auth-data";

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
    this.authService.login(this.getLoginFormData())
      .subscribe()
  }

  private getLoginFormData(): UserAuthData {
    return {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    }
  }

}
