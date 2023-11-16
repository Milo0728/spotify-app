import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSearchService {

  private searchFilterSubject = new Subject<string | string[]>()

  searchFilter$ = this.searchFilterSubject.asObservable()

  updateSearchFilter(filter: string | string[]) {
    this.searchFilterSubject.next(filter)
  }
}
