import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/interfaces/team';
import { Country } from 'src/app/interfaces/player';
import { TeamsTableHeaders } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {
  public teams$: Observable<Team[]>;
  public tableHeaders = TeamsTableHeaders;

  constructor(private teamService: TeamService) { this.teams$ = this.teamService.getTeams();}

  ngOnInit() {
    this.teams$ = this.teamService.getTeams();
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        if (teams.length === 0) {
          const team: Team = {
            name: 'MyAmazingTeam',
            country: Country.Argentina,
            players: []
          };
          this.teamService.addTeam(team);
        }
      });
  }
}
