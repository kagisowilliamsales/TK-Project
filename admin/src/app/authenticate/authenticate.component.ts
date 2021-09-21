import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit, OnDestroy {

  error: string = null;
  authSubscription: Subscription;

  constructor(private router: Router, private userservice: UserService) { }
  
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userservice.errorSubject.subscribe(msg => {
      this.error = msg;
    });

    this.authSubscription = this.userservice.isUserAuthenticated.subscribe(a => {
      if (a) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

  onSubmit(adminAuthForm: NgForm) {
    console.log("got data => " + adminAuthForm.value.email);
    this.userservice.signInUser(adminAuthForm.value.email, adminAuthForm.value.password);
  }




}
