import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { LoginService } from 'src/app/service/login.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.css']
})
export class VerticalNavComponent {
  utilisateur: Utilisateur;
  
  constructor(
    private loginService: LoginService,
    private utilisateurService: UtilisateurService
  ){ this.utilisateur = new Utilisateur()}

  disconet() {
    this.loginService.logout();
  }
  
  ngOnInit(): void{
    this.utilisateurService.decodeToken().subscribe(decodedData  => {
      if (decodedData) {
        this.utilisateur = decodedData
      }
    })
  }
  
}
