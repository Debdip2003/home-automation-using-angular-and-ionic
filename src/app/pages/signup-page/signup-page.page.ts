import { User } from './../../interface/user';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonIcon,
  IonText,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { ToastMessage } from 'src/app/services/toast-message/toast-message';
import { AuthService } from 'src/app/services/auth/auth-service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonText,
    IonIcon,
    IonInput,
    IonItem,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class SignupPagePage implements OnInit {
  //injecting the dependencies
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private routerService = inject(Router);
  private toastMessageService = inject(ToastMessage);

  signupForm!: FormGroup;
  errorMessage!: string;
  isUserAlreadySignedIn: boolean = false;

  constructor() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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

  onSubmitSignUpForm() {
    //if the signup form is invalid
    if (this.signupForm.invalid) {
      this.toastMessageService.error(
        'Please fill the form correctly.',
        'bottom'
      );
      return;
    }

    //creating a new user object
    const newUser: User = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    //adding the new user using the auth service, if the registration is successful, navigate to home page
    this.authService.addUser(newUser).subscribe({
      next: () => {
        //if the user is already signed in, fetch all users and check if the email already exists and return the isUserAlreadySignedIn state
        this.authService.loginUser().subscribe({
          next: (res: any) => {
            const user = res.find(
              (u: any) =>
                u.email === this.signupForm.value.email &&
                u.password === this.signupForm.value.password
            );
            this.isUserAlreadySignedIn = true;
          },
          error: () => {
            this.toastMessageService.error(
              'Error occurred while checking existing users. Please try again.',
              'bottom'
            );
          },
        });

        if (this.isUserAlreadySignedIn) {
          this.toastMessageService.warning(
            'User already exists! Please login instead.',
            'bottom'
          );
          this.routerService.navigate(['/login-page']);
          this.signupForm.reset();
          return;
        }

        //if the user is not signed in, proceed with registration
        this.authService.user = newUser; //setting the user data in the auth service
        localStorage.setItem('loggedInUserDetails', JSON.stringify(newUser)); //storing the user data in the local storage
        this.toastMessageService.success('Registration Successful!', 'bottom');
        this.routerService.navigate(['/home']);
        this.signupForm.reset();
      },
      error: () => {
        this.toastMessageService.error(
          'Registration Failed! Please try again.',
          'bottom'
        );
      },
    });
  }
}
