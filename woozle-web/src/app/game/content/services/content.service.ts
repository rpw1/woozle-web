import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../shared/services/settings.service';
import { ContentType } from '../state/models/content-type';
import { Content } from '../state/models/content';
import { Track } from '../state/models/track';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly httpClient = inject(HttpClient);
  private readonly settings = inject(SettingsService).settings!;

  getContent(): Observable<Content[]> {
    return this.httpClient.get<Content[]>(
      `${this.settings().woozleApiBaseUrl}/api/spotify/content`
    );
  }

  getTracks(id: string, contentType: ContentType): Observable<Track[]> {
    let params = new HttpParams();
    params = params.append('contentType', contentType);
    return this.httpClient.get<Track[]>(
      `${this.settings().woozleApiBaseUrl}/api/spotify/content/${id}/tracks`,
      {
        params: params,
      }
    );
  }
}
