import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Wolverine' },
      { id: 12, name: 'Spider-Man' },
      { id: 13, name: 'Thor' },
      { id: 14, name: 'Iron Man' },
      { id: 15, name: 'Hulk' },
      { id: 16, name: 'Captain America' },
      { id: 17, name: 'Daredevil' },
      { id: 18, name: 'Punisher' },
      { id: 19, name: 'Deadpool' },
      { id: 20, name: 'Emma Frost' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}