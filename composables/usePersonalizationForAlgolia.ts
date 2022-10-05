import enrichmentsMap from '../data/enrichments.json'

function getCategoryForScore(score: string) {
  const cat = score.split("_")[0]
  return enrichmentsMap.find(enrichment => enrichment.id === String(cat)).name
}

function getValueForScore(score: string) {
  const cat = score.split("_")[0]
  const val = score.split("_")[1]
  const category = enrichmentsMap.find(enrichment => enrichment.id === String(cat))
  return category.values.find(value => value.id === String(val)).value
}

export function usePersonalizationForAlgolia() {
  const { $uniformContext } = useNuxtApp()
  const { scores } = $uniformContext

  const res = []
  for (const enr in scores) {
    const cat = getCategoryForScore(enr)
    const value = getValueForScore(enr)
    const score = scores[enr]

    res.push({
      cat,
      value,
      score
    })
  }

  return res.map((value) => {
    return `${value.cat}:${value.value}<score=${value.score}>`;
  });
}