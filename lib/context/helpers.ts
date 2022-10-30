import enrichmentsMap from '../../data/enrichments.json'

export function getCategoryForScore(score: string) {
  const cat = score.split("_")[0]
  return enrichmentsMap.find(enrichment => enrichment.id === String(cat))
}

export function getValueForScore(score: string) {
  const cat = score.split("_")[0]
  const val = score.split("_")[1]
  const category = enrichmentsMap.find(enrichment => enrichment.id === String(cat))

  return category.values.find(value => value.id === String(val))
}

export function getEnrichmentIdByTag(value: string, category: string) {
  const cat = enrichmentsMap.find(enr => enr.name === category)
  const inter = cat.values.find(val => val.value === value)
  if (inter) {
    return inter.id
  }
}

export function getCategoryIdByCategory(category: string) {
  return enrichmentsMap
    .find(enr => enr.name === category).id
}