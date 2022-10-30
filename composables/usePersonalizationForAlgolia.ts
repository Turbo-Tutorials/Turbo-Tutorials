import { useScores } from "@uniformdev/context-vue";
import { getCategoryForScore, getValueForScore } from '../lib/context/helpers'

export function usePersonalizationForAlgolia() {
  const scores = useScores()
  delete scores.value['hasClickedOnBmac'];
  delete scores.value['vueconftoronto'];
  delete scores.value['jamstackconf'];

  const res = []
  for (const enr in scores.value) {
    const cat = getCategoryForScore(enr).name
    const value = getValueForScore(enr).value
    const score = scores.value[enr]

    res.push({
      cat,
      value,
      score
    })
  }

  const query = ref([]);

  res.forEach(value => {
    if (value.score > 0) {
      query.value.push(`${value.cat === 'Interest' ? 'tags' : 'complexity'}:${value.value}<score=${value.score}>`)
    }
  })

  return query;
}