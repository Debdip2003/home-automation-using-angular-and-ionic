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
  ],
})
export class LoginPagePage implements OnInit {
  //injecting the toast message service
  private toastMessageService = inject(ToastMessage);

  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder) {
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
    //after successful validation
    this.toastMessageService.success('Login Successful!', 'bottom');
  }
}
