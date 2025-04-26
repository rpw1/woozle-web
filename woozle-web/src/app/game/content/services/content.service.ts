import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../shared/services/settings.service';
import { ContentType } from '../state/models/content-type';
import { GoodContent, GoodTrack } from '../state/models/good-content';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly httpClient = inject(HttpClient);
  private readonly settings = inject(SettingsService).settings!;

  getContent(): Observable<GoodContent[]> {
    return this.httpClient.get<GoodContent[]>(
      `${this.settings().woozleApiBaseUrl}/api/spotify/content`
    );
  }

  getTracks(id: string, contentType: ContentType): Observable<GoodTrack[]> {
    let params = new HttpParams();
    params = params.append('contentType', contentType);
    return this.httpClient.get<GoodTrack[]>(
      `${this.settings().woozleApiBaseUrl}/api/spotify/content/${id}/tracks`,
      {
        params: params,
      }
    );
  }
}
