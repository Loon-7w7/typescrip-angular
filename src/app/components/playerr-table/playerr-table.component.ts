import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Player } from 'src/app/interfaces/player';
import { TeamService } from 'src/app/services/team.service';
import { PlayerServiceService } from 'src/app/services/player-service.service';

@Component({
  selector: 'app-playerr-table',
  templateUrl: './playerr-table.component.html',
  styleUrls: ['./playerr-table.component.scss']
})
export class PlayerrTableComponent implements OnInit  {
  public players$: Observable<Player[]>;
  public selectedPlayer: Player | null;
  public showModal = false;
  constructor(private playerService: PlayerServiceService, private teamService: TeamService) {
    this.players$ = this.playerService.getPlayers();
    this.selectedPlayer = null
  }

  ngOnInit() {
    this.players$ = this.playerService.getPlayers();
  }

  newPlayer() {
    this.showModal = true;
    this.selectedPlayer = null;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  editPlayer(player: Player): void {
    this.selectedPlayer = { ...player };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  deletePlayer(player: any) {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        const moddifiedPlayers = teams[0].players ? teams[0].players.filter((p: any) => p.key !== player.$key) : teams[0].players;
        const formattedTeam = {
          ...teams[0],
          players: [...moddifiedPlayers]
        };
        this.playerService.deletePlayer(player.$key);
        this.teamService.editTeam(formattedTeam);
      });
  }

  closeDialog() {
    this.showModal = false;
  }
}
