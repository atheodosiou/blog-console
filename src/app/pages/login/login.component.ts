import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSubscription: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.initLoginForm();
  }

  onSubmit() {
    this.loginSubscription = this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
      console.log(res.message);
      this.alertService.show([
        { type: 'success', id: "login-alert", message: res.message },
        { type: 'warning', id: "login-alert", message: res.message }
      ]);
      this.router.navigateByUrl("/console");
    }, error => {
      console.error(error);
    });
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.loginForm.reset();
    this.loginSubscription.unsubscribe();
  }
}
