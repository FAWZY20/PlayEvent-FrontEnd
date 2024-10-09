import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../dataModels/utilisateur';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  usersUrl: string;

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
    this.usersUrl = 'http://localhost:8081';
  }

  findallUser(): Observable<any> {
    return this.http.get<Utilisateur[]>(this.usersUrl + `/user`)
  }

  findUserByuserId(userId: string): Observable<any> {
    return this.http.get<Utilisateur>(this.usersUrl + `/user/${userId}`)
  }

  findUserByRole(userRole: string): Observable<any> {
    return this.http.get<Utilisateur>(this.usersUrl + `/user/role/${userRole}`)
  }

  findUserByMail(mail: string): Observable<any> {
    return this.http.get<Utilisateur>(this.usersUrl + `/user/mail/${mail}`)
  }

  addUser(utilisateur: Utilisateur): Observable<any> {
    return this.http.post<Utilisateur>(this.usersUrl + "/user", utilisateur)
  }

  updateRole(userId: string, role: string) {
    this.http.patch(this.usersUrl + `/user/role/${userId}`, role).subscribe(() => window.location.reload())
  }

  deleteUser(userId: string) {
    this.http.delete(this.usersUrl + `/user/${userId}`).subscribe(() => window.location.reload())
  }

  decodeToken(): Observable<any> {
    let token: any = localStorage.getItem('userAuth');
    if (token) {
      let decodedToken: any = jwt_decode.jwtDecode(token);
      return this.findUserByuserId(decodedToken.sub);
    } else {
      console.error('Token non trouvé dans le local storage.');
      return new Observable();
    }
  }
}
