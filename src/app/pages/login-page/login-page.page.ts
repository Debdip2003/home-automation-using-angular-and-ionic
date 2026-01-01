import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonContent,
  IonItem,
  IonIcon,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { ToastMessage } from 'src/app/services/toast-message/toast-message';
import { AuthService } from 'src/app/services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonButton,
    IonInput,
    IonIcon,
    IonItem,
    IonContent,
    IonButtons,
    IonBackButton,
    IonHeader,
    CommonModule,
    FormsModule,
    IonToolbar,
    IonTitle,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class LoginPagePage implements OnInit {
  //injecting the toast message service
  private toastMessageService = inject(ToastMessage);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  errorMessage!: string;

  constructor() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[0-9]).{6,}$'),
        ],
      ],
    });
  }

  ngOnInit() {}

  onSubmitLoginForm() {
    //checking form validity adn giving toast message accordingly
    if (this.loginForm.invalid) {
      if (this.loginForm.get('email')?.invalid) {
        this.toastMessageService.error(
          'Please enter a valid email address',
          'bottom'
        );
        return;
      }

      if (this.loginForm.get('password')?.invalid) {
        this.toastMessageService.error(
          'Password must be at least 6 characters and contain a number',
          'bottom'
        );
        return;
      }
      return;
    }

    //calling the login user function
    this.loginUser();
  }

  //login user function
  loginUser() {
    this.authService.loginUser().subscribe({
      next: (res: any) => {
        const user = res.find(
          (u: any) =>
            u.email === this.loginForm.value.email &&
            u.password === this.loginForm.value.password
        );

        //if user is found
        if (user) {
          this.authService.setUser(user); //setting the user data in the auth service
          localStorage.setItem('loggedInUserDetails', JSON.stringify(user)); //storing the user data in the local storage

          this.toastMessageService.success('Login Successful!', 'bottom');
          this.router.navigate(['/home']);
        }
        //if the user is not found
        else {
          this.toastMessageService.error(
            'User not found! Please register first.',
            'bottom'
          );
          //navigating to signup page after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/signup-page']);
          }, 2000);
        }
      },
      error: () => {
        this.toastMessageService.error(
          'Login failed! Please try again later.',
          'bottom'
        );
      },
    });
  }
}
