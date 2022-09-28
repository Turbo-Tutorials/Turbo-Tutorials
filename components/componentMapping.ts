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
// import Talks from './Talks.vue';

const mapping = {
  richtext: Richtext,
  tutorialList: TutorialList,
  tutorialsByFacet: TutorialsByFacet,
  twoColumn: TwoColumn,
  ttTitle: TtTitle,
  ttVideo: TtVideo,
  ttComments: TtComments,
  ttSimilar: TtSimilar,
  // talks: Talks,
};

export function resolveRenderer(componentInstance: ComponentInstance) {
  return mapping[componentInstance.type] ?? DefaultNotImplementedComponent;
}

export default mapping;