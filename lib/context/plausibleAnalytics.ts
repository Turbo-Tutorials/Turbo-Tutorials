import { PersonalizationEvent, TestEvent, ContextPlugin } from '@uniformdev/context';

declare global {
  interface Window {
    __UF_PATCHED_GTAG__?: boolean;
  }
}
export const enablePlausibleAnalytics = (options?: {
  /** If true, disables reflecting events passed to gtag into Uniform Context as event signals */
  disableEventSignals?: boolean;
  /** Override the window object that will have the gtag property added to it */
  theWindow?: { gtag?: 'Gtag.Gtag'; __UF_PATCHED_GTAG__?: boolean };
  /** Whether to emit every personalize and test that occurs, or only if something has actually changed
   * false (default): only emit events when a test assigns a variant the first time, or a personalization chooses different variants than before
   * true: emit an event every time a personalization or test is evaluated (e.g. for vDOM frameworks, each time a re-render occurs)
   */
  emitAll?: boolean;
}): ContextPlugin => {
  const {
    disableEventSignals,
    theWindow = typeof window !== 'undefined' ? window : undefined,
    emitAll,
  } = options || {};

  const isGtagConfigured = (): boolean => {
    return true
    //return typeof theWindow !== 'undefined' && typeof theWindow.gtag === 'function';
  };

  return {
    init: (context) => {
      // Handle emitting personalization results to GA4
      const onPersonalizationResult = (result: PersonalizationEvent) => {
        if (!isGtagConfigured()) {
          context.log('warn', 700);
          return;
        }

        // only emit analytics events when the placement actually changes
        // (e.g. not every re-render)
        if (!emitAll && !result.changed) {
          return;
        }

        // theWindow!.gtag?.('event', result.name, {
        //   event_category: 'Uniform Personalization',
        //   event_label: result.variantIds.join(', '),
        //   is_control_group: result.control ? 1 : 0,
        // });
        console.log('event', result.name, {
          event_category: 'Uniform Personalization',
          event_label: result.variantIds.join(', '),
          is_control_group: result.control ? 1 : 0,
        });
      };

      // Handle emitting test results to GA4
      const onTestResult = (result: TestEvent) => {
        if (!isGtagConfigured()) {
          context.log('warn', 700);
          return;
        }

        // only emit analytics events when the placement actually changes
        // (e.g. not every re-render)
        if (!emitAll && !result.variantAssigned) {
          return;
        }

        // theWindow!.gtag?.('event', result.name, {
        //   event_category: 'Uniform AB Testing',
        //   event_label: result.variantId ?? 'No Variant',
        // });
        console.log('event', result.name, {
          event_category: 'Uniform AB Testing',
          event_label: result.variantId ?? 'No Variant',
        })
      };

      context.events.on('personalizationResult', onPersonalizationResult);
      context.events.on('testResult', onTestResult);

      // Handle redirecting events from GA4 to event signals in Uniform Context
      // if (!disableEventSignals && isGtagConfigured() && !theWindow?.__UF_PATCHED_GTAG__) {
      //   //const defaultGtag = theWindow!.gtag;
      //   // theWindow!.gtag = (...args: any[]) => {
      //   //   // @ts-ignore - we're passing the args through to the default gtag
      //   //   defaultGtag(...args);

      //   //   // if we get an event passed to gtag, emit it to Context.
      //   //   // Except our own test and personalization tracking events
      //   //   if (
      //   //     args[0] === 'event' &&
      //   //     !['Uniform AB Testing', 'Uniform Personalization'].includes(args[2]?.event_category)
      //   //   ) {
      //   //     context.update({ events: [{ event: args[1] }] });
      //   //   }
      //   // };
      //   context.log('debug', 701);
      //   theWindow!.__UF_PATCHED_GTAG__ = true;
      // }

      return () => {
        context.events.off('personalizationResult', onPersonalizationResult);
        context.events.off('testResult', onTestResult);
      };
    },
  };
};