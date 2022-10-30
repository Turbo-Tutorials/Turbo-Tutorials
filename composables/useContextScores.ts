import { ScoreVector } from '@uniformdev/context';
import { dequal } from 'dequal/lite';
import { getCategoryForScore, getValueForScore } from '../lib/context/helpers'

type enrichedScoreVector = [
  {
    id: string;
    category: string;
    value: string;
    cap: number;
    score: number;
  }
]

function mapScores(scores: ScoreVector) {
  const enrichedScores = []

  // only enrichments...
  delete scores['hasClickedOnBmac'];
  delete scores['vueconftoronto'];
  delete scores['jamstackconf'];

  for (const enr in scores) {
    const cat = getCategoryForScore(enr)
    const value = getValueForScore(enr)
    const score = scores[enr]

    enrichedScores.push({
      id: enr,
      category: cat.name,
      value: value.value,
      score,
      cap: cat.cap
    })
  }

  return enrichedScores as enrichedScoreVector;
}

function toAlgoliaFilter(scores: enrichedScoreVector) {
  const query = []

  scores.forEach(value => {
    if (value.score > 0) {
      query.push(`${value.category === 'Interest' ? 'tags' : 'complexity'}:${value.value}<score=${value.score}>`)
    }
  })

  return query;
}

export const useContextScores = () => {
  const { $useUniformContext: useUniformContext } = useNuxtApp();
  const { context } = useUniformContext()

  const scores = ref<enrichedScoreVector>(mapScores(context.scores));
  const algoliaQueryFilter = ref(toAlgoliaFilter(mapScores(context.scores)))

  watchEffect(() => {
    const scoringChangeListener = (updatedScores: ScoreVector) => (scores.value = mapScores(updatedScores));
    const filterChangeListener = (updatedScores: ScoreVector) => (algoliaQueryFilter.value = toAlgoliaFilter(mapScores(updatedScores)));
    const currentScores = mapScores(context.scores);
    const currentAlgoliaQueryFilter = toAlgoliaFilter(mapScores(context.scores))

    if (!dequal(scores.value, currentScores)) {
      scores.value = currentScores;
      algoliaQueryFilter.value = currentAlgoliaQueryFilter
    }

    context.events.on('scoresUpdated', scoringChangeListener);
    context.events.on('scoresUpdated', filterChangeListener);
    return () => {
      context.events.off('scoresUpdated', scoringChangeListener);
      context.events.off('scoresUpdated', filterChangeListener);
    };
  });

  return {
    scores,
    algoliaQueryFilter
  }
};