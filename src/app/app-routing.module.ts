import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './models/connexion/connexion.component';
import { HomeComponent } from './models/home/home.component';
import { EvenementComponent } from './models/evenement/evenement.component';
import { PlaylistComponent } from './models/playlist/playlist.component';
import { FormPlaylistComponent } from './models/form-playlist/form-playlist.component';
import { UpdatePlaylistComponent } from './models/update-playlist/update-playlist.component';
import { FormEventComponent } from './models/form-event/form-event.component';
import { UpdateEventComponent } from './models/update-event/update-event.component';

const routes: Routes = [
  { path: "", component: ConnexionComponent },
  {
    path: "admin",
    children: [
      { path: "", component: HomeComponent },
      { path: "evenement", component: EvenementComponent },
      {
        path: "playlist",
        children: [
          { path: "", component: PlaylistComponent },
          { path: "newPlaylist", component: FormPlaylistComponent },
          { path: "updatePlaylist", component: UpdatePlaylistComponent },
          { path: "updateEvenement", component: UpdateEventComponent },
          { path: "newEvent", component: FormEventComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
