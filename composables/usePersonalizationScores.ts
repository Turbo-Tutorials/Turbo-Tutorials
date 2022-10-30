import enrichmentsMap from '../data/enrichments.json'

export function usePersonalizationScores() {
  const { $uniformContext } = useNuxtApp()
  const { scores } = $uniformContext

  delete scores['hasClickedOnBmac'];
  delete scores['VueConfToronto'];
  delete scores['JamstackConf'];

  const enrichments = enrichmentsMap.map(enrichment => {
    const enrichmentId = enrichment.id

    const values = enrichment.values.map(value => {
      const valueId = value.id
      value.score = scores[`${enrichmentId}_${valueId}`] || 0

      return value
    })

    enrichment.values = values
    return enrichment
  })

  return {
    enrichments,
  }
}