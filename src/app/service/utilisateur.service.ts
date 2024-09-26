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


  findUserByuserId(userId: string): Observable<any> {
    return this.http.get<Utilisateur>(this.usersUrl + `/user/${userId}`)
  }

  
  decodeToken(): Observable<any>{
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
