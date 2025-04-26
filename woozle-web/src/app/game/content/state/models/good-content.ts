import { ContentType } from './content-type';

export interface Image {
  url: string;
  height?: number;
  width?: number;
}

export interface GoodContent {
  id: string;
  contentType: ContentType;
  name: string;
  description?: string;
  image: Image;
}

export interface GoodTrack {
  id: string;
  explicit?: boolean;
  name: string;
  artist: string;
  trackUri: string
  image: Image;
}
