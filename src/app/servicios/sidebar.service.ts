import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _sideBarState = new BehaviorSubject<boolean>(false);

  constructor() { }

  get sidebarState$(){
    return this._sideBarState;
  }

  toggleSidebar() {
    this._sideBarState.next(!this._sideBarState.value);
  }
  
}
