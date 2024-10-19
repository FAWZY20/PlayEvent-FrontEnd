import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../dataModels/utilisateur';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { UtilisateurService } from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersUrl: string;
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private route: Router
  ) { 
    this.usersUrl = 'http://localhost:8081';
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('userAuth');
  }

  login(utilisateur: Utilisateur){
    this.http.post<Utilisateur>(this.usersUrl + '/login', utilisateur).pipe(
      map((response: any) => {
        localStorage.setItem('userAuth', JSON.stringify(response));
        return response;
      })).subscribe((res) => {
        if (res != null) {
          this.route.navigate(['/admin']);
          this.authStatus.next(true);
        } else {
          localStorage.clear()
          this.route.navigate(['']);
        }
      });
  }

  logout(){
    localStorage.clear();
    setTimeout(() => {
      this.route.navigate(['']);
    }, 500);
  }

}
