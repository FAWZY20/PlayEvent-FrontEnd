import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Evenement } from '../dataModels/Evenement';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  usersUrl: string;

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
    this.usersUrl = 'http://localhost:8081';
  }

  addEvent(evenement: Evenement) {
    this.http.post<Evenement>(this.usersUrl + "/evenement", evenement).subscribe(() => {
      this.route.navigate(['/admin/evenement'])
    })
  }

  deleteEvent(eventId: any) {
    this.http.delete(this.usersUrl + `/evenement/${eventId}`).subscribe(() => {
      window.location.reload();
    })
  }

  getAllEvent(): Observable<any> {
    return this.http.get(this.usersUrl + "/evenement")
  }

  getEventById(eventId: any): Observable<any> {
    return this.http.get(this.usersUrl + `/evenement/${eventId}`)
  }

  updateEvent(evenement: Evenement) {
    this.http.put(this.usersUrl + `/evenement`, evenement).subscribe(() => {
      this.route.navigate(['/admin/evenement'])
    })
  }
}
