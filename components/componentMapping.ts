import { ComponentInstance } from '@uniformdev/canvas';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-vue';

import Richtext from './Richtext.vue';
import TutorialList from './TutorialList.vue';
import TutorialsByFacet from "./TutorialsByFacet.vue"
import TwoColumn from './TwoColumn.vue';
import TtTitle from './TtTitle.vue';
import TtVideo from './TtVideo.vue';
// import Media from './Media.vue';
// import MyDetails from './MyDetails.vue';
// import Talks from './Talks.vue';

const mapping = {
  richtext: Richtext,
  tutorialList: TutorialList,
  tutorialsByFacet: TutorialsByFacet,
  twoColumn: TwoColumn,
  ttTitle: TtTitle,
  ttVideo: TtVideo,
  // details: MyDetails,
  // talks: Talks,
};

export function resolveRenderer(componentInstance: ComponentInstance) {
  return mapping[componentInstance.type] ?? DefaultNotImplementedComponent;
}

export default mapping;