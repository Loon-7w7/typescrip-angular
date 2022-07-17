import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  private playersDB:AngularFireList<Player>;
  constructor(private db: AngularFireDatabase) {
    this.playersDB = this.db.list('/players', ref => ref.orderByChild('name'));
  }

  getPlayers() : Observable<Player[]>{
    return this.playersDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val()} as Player));
      })
    )
  }
  addPlayer(player: Player) {
    return this.playersDB.push(player);
  }
  deletePlayer(id: string) {
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayerData:any) {
    const $key = newPlayerData.$key;
    delete(newPlayerData.$key);
    this.db.list('/players').update($key,newPlayerData);
  }
}


