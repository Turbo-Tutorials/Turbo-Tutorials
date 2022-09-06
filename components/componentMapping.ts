import { ComponentInstance } from '@uniformdev/canvas';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-vue';

import Richtext from './Richtext.vue';
import Hero from './Hero.vue';
import Bios from './Bios.vue';
import Emcee from './Emcee.vue';
import Media from './Media.vue';
import MyDetails from './MyDetails.vue';
import Talks from './Talks.vue';

const mapping = {
  richtext: Richtext,
  hero: Hero,
  bios: Bios,
  emcee: Emcee,
  media: Media,
  details: MyDetails,
  talks: Talks,
};

export function resolveRenderer(componentInstance: ComponentInstance) {
  return mapping[componentInstance.type] ?? DefaultNotImplementedComponent;
}

export default mapping;