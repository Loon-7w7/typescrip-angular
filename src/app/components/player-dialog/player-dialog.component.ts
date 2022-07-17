import { Component, OnInit } from '@angular/core';
import { Country, SquadNumber } from 'src/app/interfaces/player';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TeamService } from 'src/app/services/team.service';
import { PlayerServiceService } from 'src/app/services/player-service.service';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss']
})
export class PlayerDialogComponent implements OnInit {
  private team;
  public country = Object.keys(Country).map(key => ({ label: key, key: this.country[key] }));
  public squadNumber = Object.keys(SquadNumber)
  .slice(Object.keys(SquadNumber).length / 2)
    .map(key => ({
      label: key,
      key: SquadNumber[key]
    }));
  constructor(private playerService: PlayerServiceService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

}
