import enrichmentsMap from '../data/enrichments.json'

function getEnrichmentIdByTag(value: string, category: string) {
  const cat = enrichmentsMap.find(enr => enr.name === category)
  const inter = cat.values.find(val => val.value === value)
  if (inter) {
    return inter.id
  }
}

function getCategoryIdByCategory(category: string) {
  return enrichmentsMap
    .find(enr => enr.name === category).id
}

export async function usePersonalization(options: {
  interests: {
    interest: string;
    strength: number
  },
  complexity: {
    value: string,
    strength: number
  }
}) {
  const { $useUniformContext: useUniformContext } = useNuxtApp();
  const { context } = useUniformContext()

  const enrichments = options.interests.interest.split(",").map((interest) => {
    return {
      str: options.interests.strength,
      cat: getCategoryIdByCategory('Interest'),
      key: getEnrichmentIdByTag(interest, 'Interest'),
    };
  });

  const complexity = {
    str: options.complexity.strength,
    cat: getCategoryIdByCategory('Complexity'),
    key: getEnrichmentIdByTag(options.complexity.value.toLowerCase(), 'Complexity'),
  }

  enrichments.push(complexity)

  await context.update({
    enrichments
  });
}