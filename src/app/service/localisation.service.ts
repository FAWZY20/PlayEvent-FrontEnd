import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  localisationUrl:string 

  constructor(
    private http: HttpClient
  ) {
    this.localisationUrl = "https://cors-anywhere.herokuapp.com/https://api-adresse.data.gouv.fr/search/?q="
  }

  searchLocalisation(search: string): Observable<any> {
    return this.http.get(this.localisationUrl + search)
  }

}
