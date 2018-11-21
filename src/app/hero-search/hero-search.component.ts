import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
// the search method is called by the search textbox on every input and
// the search term is pushed into the searchTerms observable that becomes
// a source of observables emitting a steady stream of search terms
// ngOnInit is called
// the observable returned by searchTerms function which is a "Subject" observable
// is piped through RxJS operators to reduce HTTP calls
// the search is done every 300 ms as long as the text is new
// once the search terms make it through the 2 operators
// switchMap ignores the previous searche observables and
// returns the latest search observable from the callback function:
// (term: string) => this.heroService.searchHeroes(term)
// here the searchHeroes method from HeroService returns an observable Hero array
// and is stored in the heroes$ observable which is of type Hero array
// the template file subscribes to this heroes$ observable using AsyncPipe (| async)
// subscribe will make use of the heroes$ observable