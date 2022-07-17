import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { PlayerServiceService } from './services/player-service.service';
import { TeamService } from './services/team.service';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { PlayerrTableComponent } from './components/playerr-table/playerr-table.component';
import { PlayerDialogComponent } from './components/player-dialog/player-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TeamTableComponent,
    PlayerrTableComponent,
    PlayerDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [PlayerServiceService,TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
