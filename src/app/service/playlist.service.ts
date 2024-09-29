import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from '../dataModels/Playlist';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  usersUrl: string;

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
    this.usersUrl = 'http://localhost:8081';
  }

  addPlaylist(playlist: Playlist){
    this.http.post<Playlist>(this.usersUrl + "/playlist", playlist).subscribe( () => {
      console.log("bien enregistrer");
    })
  }

  getAllPlaylist():Observable<any>{
    return this.http.get(this.usersUrl + "/playlist")
  }

}
