import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifySongsStatsService {
  private URL: string = 'https://spotifystats-1d226-default-rtdb.firebaseio.com/collection.json';


  constructor(private http:HttpClient) { }

  getResponse() {
    return this.http.get(this.URL);
  }
}
