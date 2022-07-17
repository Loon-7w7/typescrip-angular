import { Component, Input,Output, OnInit } from '@angular/core';
import { Country, Player, SquadNumber } from 'src/app/interfaces/player';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TeamService } from 'src/app/services/team.service';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Team } from 'src/app/interfaces/team';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss']
})
export class PlayerDialogComponent implements OnInit {
  @Input() player: Player | any ;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  private team:any;
  public country:any = Object.keys(Country).map(key => ({ label: key, key: this.country[key] }));
  public squadNumber = Object.keys(SquadNumber)
  .slice(Object.keys(SquadNumber).length / 2)
    .map($key => ({
      label: $key,
      key: SquadNumber[Number($key)]
    }));
  constructor(private playerService: PlayerServiceService, private teamService: TeamService) {
  }

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

  private newPlayer(playerFormValue:Player) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey = {
      ...playerFormValue,
      key
    };
    const formattedTeam = {
      ...this.team,
      players: [...(this.team.players ? this.team.players : []), playerFormValueKey]
    };
    this.teamService.editTeam(formattedTeam);
  }
  private editPlayer(playerFormValue:Player) {
    const playerFormValueWithKey = { ...playerFormValue, $key: this.player.$key };
    const playerFormValueWithFormattedKey = { ...playerFormValue, key: this.player.$key };
    delete playerFormValueWithFormattedKey.$key;
    const moddifiedPlayers = this.team.players
      ? this.team.players.map((player: { $key: any; }) => {
          return player.$key === this.player.$key ? playerFormValueWithFormattedKey : this.player;
        })
      : this.team.players;
    const formattedTeam = {
      ...this.team,
      players: [...(moddifiedPlayers ? moddifiedPlayers : [playerFormValueWithFormattedKey])]
    };
    this.playerService.editPlayer(playerFormValueWithKey);
    this.teamService.editTeam(formattedTeam);
  }


  onSubmit(playerForm: NgForm) {
    const playerFormValue = { ...playerForm.value };
    if (playerForm.valid) {
      playerFormValue.leftFooted = playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    if (this.player) {
      this.editPlayer(playerFormValue);
    } else {
      this.newPlayer(playerFormValue);
    }
    window.location.replace('#');
  }

  onClose() {
    this.closeDialog.emit(true);
  }
}

