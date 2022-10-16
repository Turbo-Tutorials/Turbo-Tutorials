import { ScoreVector } from '@uniformdev/context';
import { ref, watchEffect } from 'vue-demi';
import { dequal } from 'dequal/lite';
import enrichmentsMap from '../data/enrichments.json'

type enrichedScoreVector = [
  {
    id: string;
    category: string;
    value: string;
    cap: number;
    score: number;
  }
]

function getCategoryForScore(score: string) {
  const cat = score.split("_")[0]
  return enrichmentsMap.find(enrichment => enrichment.id === String(cat))
}

function getValueForScore(score: string) {
  const cat = score.split("_")[0]
  const val = score.split("_")[1]
  const category = enrichmentsMap.find(enrichment => enrichment.id === String(cat))
  return category.values.find(value => value.id === String(val))
}

function mapScores(scores: ScoreVector) {
  const enrichedScores = []
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

export const useContextScores = () => {
  const { $useUniformContext: useUniformContext } = useNuxtApp();
  const { context } = useUniformContext()

  const scores = ref<enrichedScoreVector>(mapScores(context.scores));

  watchEffect(() => {
    const scoringChangeListener = (updatedScores: ScoreVector) => (scores.value = mapScores(updatedScores));
    const currentScores = mapScores(context.scores);

    if (!dequal(scores.value, currentScores)) {
      scores.value = currentScores;
    }

    context.events.on('scoresUpdated', scoringChangeListener);
    return () => {
      context.events.off('scoresUpdated', scoringChangeListener);
    };
  });

  return scores;
};