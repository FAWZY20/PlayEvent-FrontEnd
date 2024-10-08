import { Component, Output } from '@angular/core';
import { Playlist } from 'src/app/dataModels/Playlist';
import { PlaylistService } from 'src/app/service/playlist.service';
import { SearchSongService } from 'src/app/service/search-song.service';

@Component({
  selector: 'app-form-playlist',
  templateUrl: './form-playlist.component.html',
  styleUrls: ['./form-playlist.component.css']
})
export class FormPlaylistComponent {

  searchTerm: string = "";
  data: any[] = [];
  listSong: any[] = []
  completTab: boolean = false
  songExist: boolean = false
  songInfo: any;
  playlist: Playlist
  nameExist: boolean = false;

  constructor(
    private searchSongService: SearchSongService,
    private playlistService: PlaylistService,
  ) { this.playlist = new Playlist() }


  onSearch() {
    this.searchSongService.searchSong(this.searchTerm).subscribe(res => {
      this.data = res.data;
    })
  }

  deleteSong(index: number) {
    this.listSong.splice(index, 1)
  }

  existSong(song: any) {
    for (let index = 0; index < this.listSong.length; index++) {
      if (this.listSong[index].titre == song.title) {
        this.songExist = true
      } else {
        this.songExist = false
      }
    }
  }

  addListSong(song: any) {
    if (this.listSong.length < 10) {
      this.existSong(song)
      if (!this.songExist) {
        this.songInfo = {
          "titre": song.title,
          "artiste": song.artist.name,
          "album": song.album.title,
          "duree": song.duration,
          "cover": song.album.cover
        }
        this.listSong.push(this.songInfo)
      }
    } else {
      this.completTab = true
    }
  }

  onSubmit() {
    this.playlistService.getAllPlaylist().subscribe(res => {
      const playlistExistante = res.find((p: any) => p.nom === this.playlist.nom);
      if (playlistExistante) {
        this.nameExist = true;
      } else {
        this.playlist.musique = this.listSong
        this.playlistService.addPlaylist(this.playlist)
      }
    })
  }

}
