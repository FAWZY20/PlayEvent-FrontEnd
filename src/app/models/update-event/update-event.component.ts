import { Component } from '@angular/core';
import { Evenement } from 'src/app/dataModels/Evenement';
import { EvenementService } from 'src/app/service/evenement.service';
import { LocalisationService } from 'src/app/service/localisation.service';
import { PlaylistService } from 'src/app/service/playlist.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  dateNow: Date = new Date()
  email: any;
  listInvitee: any;
  evenement: Evenement
  errorDateEvent: any;
  searchTerm: string = "";
  data: any[] = [];
  playlistId: any;
  listAnimateur: any[] =[];
  listPlaylist: any[] = [];

  constructor(
    private playlistService: PlaylistService,
    private utiisateurService: UtilisateurService,
    private evenementService: EvenementService,
    private localisationService: LocalisationService
  ) {
    this.evenement = new Evenement();
  }

  checkDate($event: any) {
    const eventDate: any = new Date($event)
    if (eventDate.getTime() >= this.dateNow.getTime()) {
      this.evenement.date.setDate(eventDate)
    } else {
      this.errorDateEvent = true
    }
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

  addLocalisation(localisation: any) {
    var loc = localisation.properties.city + " " + localisation.properties.name
    this.searchTerm = loc
    this.evenement.lieu = loc
    this.data = []
  }

  onSearch() {
    if (this.searchTerm.length >= 3) {
      this.localisationService.searchLocalisation(this.searchTerm).subscribe(res => {
        this.data = res.features;
      })
    }
  }

  onSubmit() {
    this.evenementService.getAllEvent().subscribe(res => {
      const eventFiltrees = res.find((p: any) => p.id == this.evenement.id);
      if (eventFiltrees) {
        this.evenementService.updateEvent(this.evenement)
      }
    })
  }

  ngOnInit() {
    const storedEvenet = localStorage.getItem("Evenement");
    this.evenement = storedEvenet ? JSON.parse(storedEvenet) : [];
    this.searchTerm = this.evenement.lieu
    this.playlistId = this.evenement.playlist.id
    this.listInvitee = this.evenement.inviteeEmail
    this.playlistService.getAllPlaylist().subscribe(res => {
      this.listPlaylist = res
    })
    this.utiisateurService.findUserByRole("ANIMATEUR").subscribe(res => {
      this.listAnimateur = res
    })
  }

}
