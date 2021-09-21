import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'app/models/User/user';
import { Subject } from 'rxjs/internal/Subject';
import { SellerInterface } from 'app/models/Seller/seller.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  public newSeller: SellerInterface = {
    business: {},
    account: {}
  };

  private isAuthenticated = false;
  public isUserAuthenticated = new Subject<boolean>();
  public errorSubject = new Subject<string>();

  constructor(private authService: AuthService, private router: Router,
              private firestore: AngularFirestore) { }

  private checkIfDocExist(email: string) {
    this.firestore.collection('Seller').doc(email).get().toPromise().then(doc => {
      if (doc.exists) {
        this.newSeller = doc.data() as SellerInterface;
        return true;
      } else {
        this.errorSubject.next('Invalid User account');
        this.authService.logout();
        return false;
      }
    });
  }

  public signInUser(email: string, password: string) {
    this.authService.login(email, password).subscribe(resData => {
      this.checkIfDocExist(resData.email);
    }, errorMessage => {
      this.errorSubject.next(errorMessage);
    });
  }

  public autologin() {
    const loadeduser = this.authService.autoLogin();
    if (!loadeduser) {
      return;
    }
    this.checkIfDocExist(loadeduser.email);
  }

  public logout() {
    // Bugs might appear if the first line was not a success
    this.authService.logout();
    this.isAuthenticated = false;
    this.isUserAuthenticated.next(this.isAuthenticated);
  }

}
