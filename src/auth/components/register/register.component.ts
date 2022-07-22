import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {changePassVisibility} from "../../helpers/change-pass-visibility-helper";
import { AuthService } from "../../services/auth.service";
import { tap } from "rxjs";
import { UserAuthData } from "../../interfaces/user-auth-data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
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

  showHidePass(event: any, id: string): void {
    changePassVisibility(event.target, id);
  }

  registerUser() {
    this.authService.register(this.getRegisterFormData()).pipe(
      tap((res) => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard/menu/1']);
      })
    )
      .subscribe();
  }

  private getRegisterFormData(): UserAuthData  {
    return  {
      username: this.registerForm.controls.username.value,
      phone: this.registerForm.controls.phone.value,
      password: this.registerForm.controls.password.value,
      password_confirmation: this.registerForm.controls.password_confirmation.value,
    }
  }

}
