import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { Evenement } from 'src/app/dataModels/Evenement';
import { Playlist } from 'src/app/dataModels/Playlist';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { EvenementService } from 'src/app/service/evenement.service';
import { LocalisationService } from 'src/app/service/localisation.service';
import { PlaylistService } from 'src/app/service/playlist.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.css']
})
export class FormEventComponent {
  dateNow: Date = new Date()
  listPlaylist: Playlist[] = []
  listInvitee: string[] = []
  listAnimateur: Utilisateur[] = []
  evenement: Evenement
  playlistId: string = ""
  email: string = "";
  errorDateEvent: boolean = false
  searchTerm: string = "Choissir votre Lieu"
  data: any[] = [];

  constructor(
    private playlistService: PlaylistService,
    private utiisateurService: UtilisateurService,
    private evenementService: EvenementService,
    private localisationService: LocalisationService
  ) {
    this.evenement = new Evenement()
  }

  checkDate($event: any) {
    const eventDate: any = new Date($event)
    if (eventDate.getTime() >= this.dateNow.getTime()) {
      this.evenement.date.setDate(eventDate)
    } else {
      this.errorDateEvent = true
    }
  }

  onSearch() {
    if (this.searchTerm.length >= 3) {
      this.localisationService.searchLocalisation(this.searchTerm).subscribe(res => {
        this.data = res.features;
      })
    }
  }

  addLocalisation(localisation: any) {
    var loc = localisation.properties.city + " " + localisation.properties.name
    this.searchTerm = loc
    this.evenement.lieu = loc
    this.data = []
  }

  addEmail(email: any) {
    const emailExistante = this.listInvitee.find((p: any) => p === email);
    if (emailExistante) {
      console.log("l'email existe");
    } else {
      this.listInvitee.push(email)
    }
  }

  deleteInvite(index: number) {
    this.listInvitee.splice(index, 1)
  }

  ngOnInit() {
    this.playlistService.getAllPlaylist().subscribe(res => {
      this.listPlaylist = res
    })
    this.utiisateurService.findUserByRole("ANIMATEUR").subscribe(res => {
      this.listAnimateur = res
    })
  }

  onSubmit() {
    this.evenement.inviteeEmail = this.listInvitee
    this.playlistService.getPlaylistById(this.playlistId).subscribe(res => {
      this.evenement.playlist = res
      this.evenementService.addEvent(this.evenement)
    })
  }

}
