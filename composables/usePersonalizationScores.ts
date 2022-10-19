import enrichmentsMap from '../data/enrichments.json'

function getRadarsforEnrichment(enrichments: any, enrichment: string) {
  const category = enrichments.find(cat => cat.name === enrichment)
  const names = category.values.map(value => value.value)
  const scores = category.values.map(value => value.score)

  return {
    names,
    scores
  }
}

export function usePersonalizationScores() {
  const { $uniformContext } = useNuxtApp()
  const { scores } = $uniformContext

  delete scores['hasClickedOnBmac'];
  delete scores['VueConfToronto'];
  delete scores['JamstackConf'];
  delete scores['conferenceVisitor'];

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
    radars: {
      interests: getRadarsforEnrichment(enrichments, 'Interest'),
      complexity: getRadarsforEnrichment(enrichments, 'Complexity'),
    }
  }
}