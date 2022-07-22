import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthUser: boolean | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isAuthUser = !!localStorage.getItem('token');
  }

  logOut(): Subscription {
    return  this.authService.logout().pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/menu/1']);
        window.location.reload();
      }),
    )
      .subscribe();
  }

}
