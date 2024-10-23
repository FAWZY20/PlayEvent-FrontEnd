import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchSongService {
  songUrl: string;
  songText: string;

  constructor(
    private http: HttpClient
  ) {
    this.songUrl = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q="
    this.songText = "https://lyrist.vercel.app/api"
  }

  searchSong(search: string): Observable<any> {
    return this.http.get(this.songUrl + search)
  }

  getSongText(artist: string, son: string): Observable<any> {
   return this.http.get(this.songText + `/${son}/${artist}`)
  }

}
