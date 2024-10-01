import { Component } from '@angular/core';
import { Playlist } from 'src/app/dataModels/Playlist';
import { PlaylistService } from 'src/app/service/playlist.service';
import { SearchSongService } from 'src/app/service/search-song.service';

@Component({
  selector: 'app-update-playlist',
  templateUrl: './update-playlist.component.html',
  styleUrls: ['./update-playlist.component.css']
})
export class UpdatePlaylistComponent {
  data: any[] = [];
  listSong: any[] = []
  completTab: any;
  songExist: any;
  nameExist: any;
  searchTerm: any;
  playlist: Playlist;
  disabledNom: boolean = true;
  disabledDescription: boolean = true;
  songInfo: any;

  constructor(
    private searchSongService: SearchSongService,
    private playlistService: PlaylistService
  ) {
    this.playlist = new Playlist()
  }

  onSearch() {
    this.searchSongService.searchSong(this.searchTerm).subscribe(res => {
      this.data = res.data;
      console.log(this.data);
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
      if (this.songExist == false) {
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

  updateNom() {
    if (this.disabledNom) {
      this.disabledNom = false
    } else {
      this.disabledNom = true
    }
  }
  
  updateDescription() {
    if (this.disabledDescription) {
      this.disabledDescription = false
    } else {
      this.disabledDescription = true
    }
  }

  ngOnInit() {
    const storedPlaylist = localStorage.getItem("playlist");
    this.playlist = storedPlaylist ? JSON.parse(storedPlaylist) : [];
    this.listSong = this.playlist.musique
  }


  onSubmit() {
    this.playlistService.getAllPlaylist().subscribe(res => {
      const playlistsFiltrees = res.filter((p: any) => p.id !== this.playlist.id);
      const playlistExistante = playlistsFiltrees.find((p: any) => p.nom === this.playlist.nom);
      if (playlistExistante) {
        this.nameExist = true;
      } else {
        this.playlist.musique = this.listSong
        this.playlistService.updatePlaylist(this.playlist)
      }
    })
  }

}
