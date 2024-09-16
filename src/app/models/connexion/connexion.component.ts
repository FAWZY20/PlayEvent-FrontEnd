import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  utilisateur: Utilisateur;

  constructor(
    private loginService: LoginService
  ){
    this.utilisateur = new Utilisateur();
  }

  onSubmit(){
    this.loginService.login(this.utilisateur);
  }
  
}
