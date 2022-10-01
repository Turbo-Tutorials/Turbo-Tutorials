import enrichmentsMap from '../data/enrichments.json'

function getCategoryForScore(score: string) {
  const cat = score.split("_")[0]
  return enrichmentsMap.find(enrichment => enrichment.id === String(cat)).name
}

function getCapForScore(score: string) {
  const cat = score.split("_")[0]
  return enrichmentsMap.find(enrichment => enrichment.id === String(cat)).cap
}

function getValueForScore(score: string) {
  const cat = score.split("_")[0]
  const val = score.split("_")[1]
  const category = enrichmentsMap.find(enrichment => enrichment.id === String(cat))
  return category.values.find(value => value.id === String(val)).value
}

export function usePersonalizationScores() {
  const { $uniformContext } = useNuxtApp()
  const { scores } = $uniformContext
  const result = []

  for (const score in scores) {
    result.push({
      category: getCategoryForScore(score),
      value: getValueForScore(score),
      score: scores[score],
      cap: getCapForScore(score)
    })
  }

  return result
}