import { ComponentInstance } from '@uniformdev/canvas';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-vue';

import Richtext from './Richtext.vue';
import TutorialList from './TutorialList.vue';
import TutorialsByFacet from "./TutorialsByFacet.vue"
import TwoColumn from './TwoColumn.vue';
import TtTitle from './TtTitle.vue';
import TtVideo from './TtVideo.vue';
import TtComments from './TtComments.vue';
import TtSimilar from './TtSimilar.vue';
import PersonalizationStatus from './PersonalizationStatus.vue';

import SearchWrapper from './SearchWrapper.vue';
import Searchbox from './SearchBox.vue';
import SearchClearRefinements from './SearchClearRefinements.vue';
import SearchMenu from './SearchMenu.vue';
import SearchStats from './searchStats.vue';
import SearchCurrentRefinements from './searchCurrentRefinements.vue';
import SearchResults from './searchResults.vue';
import TutorialsByBestMatch from './TutorialsByBestMatch.vue'
import SearchAutocomplete from './SearchAutocomplete.vue'
import SupportCreator from './SupportCreator.vue'

const mapping = {
  richtext: Richtext,
  tutorialList: TutorialList,
  tutorialsByFacet: TutorialsByFacet,
  twoColumn: TwoColumn,
  ttTitle: TtTitle,
  ttVideo: TtVideo,
  ttComments: TtComments,
  ttSimilar: TtSimilar,
  personalizationStatus: PersonalizationStatus,
  tutorialsByBestMatch: TutorialsByBestMatch,
  supportCreator: SupportCreator,

  searchwrapper: SearchWrapper,
  searchbox: Searchbox,
  searchClearRefinements: SearchClearRefinements,
  searchMenu: SearchMenu,
  searchStats: SearchStats,
  searchCurrentRefinements: SearchCurrentRefinements,
  searchResults: SearchResults,
  search: SearchAutocomplete,
};

export function resolveRenderer(componentInstance: ComponentInstance) {
  return mapping[componentInstance.type] ?? DefaultNotImplementedComponent;
}

export default mapping;