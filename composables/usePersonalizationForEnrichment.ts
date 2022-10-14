import enrichmentsMap from '../data/enrichments.json'

export function usePersonalizationForEnrichment(enrichment: string, value: string) {
  const { $uniformContext } = useNuxtApp()
  const { scores } = $uniformContext
  delete scores['hasClickedOnBmac'];

  const enrichmentCategory = enrichmentsMap.find(enr => enr.name === enrichment)
  const enrichmentId = enrichmentCategory.id;
  const enrichmentCap = enrichmentCategory.cap;
  const valueId = enrichmentCategory.values.find(val => val.value === value).id
  const score = scores[`${enrichmentId}_${valueId}`] || 0;

  return {
    enrichmentId,
    valueId,
    value: score,
    cap: enrichmentCap
  }
}