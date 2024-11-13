import { Content } from './content';
import { ContentSearchParameters } from './content-search-parameters';

export interface ContentState {
  contentSearchParameters: ContentSearchParameters,
  availableContents: Content[],
  content: Content,
}
