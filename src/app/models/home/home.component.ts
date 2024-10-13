import { Component } from '@angular/core';
import { Evenement } from 'src/app/dataModels/Evenement';
import { Playlist } from 'src/app/dataModels/Playlist';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { EvenementService } from 'src/app/service/evenement.service';
import { PlaylistService } from 'src/app/service/playlist.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  listPlaylist: Playlist[] = [];
  listEvent: Evenement[] = [];
  utilisateur: Utilisateur;
  
  constructor(
    private utilisateurService: UtilisateurService,
    private playlistService: PlaylistService,
    private evenementService: EvenementService
  ){ this.utilisateur = new Utilisateur()}

  ngOnInit(): void{
    this.utilisateurService.decodeToken().subscribe(decodedData  => {
      if (decodedData) {
        this.utilisateur = decodedData
      }
    })
    this.playlistService.getAllPlaylist().subscribe(res => {
      this.listPlaylist = res
    })
    this.evenementService.getAllEvent().subscribe(res => {
      this.listEvent = res
    })
  }
}
