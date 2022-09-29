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
  interests: string,
  complexity: string
}) {
  const { $useUniformContext } = useNuxtApp();
  const { context } = $useUniformContext();

  const enrichments = options.interests.split(",").map((interest) => {
    return {
      str: 1,
      cat: getCategoryIdByCategory('Interest'),
      key: getEnrichmentIdByTag(interest, 'Interest'),
    };
  });

  const complexity = {
    str: 1,
    cat: getCategoryIdByCategory('Complexity'),
    key: getEnrichmentIdByTag(options.complexity.toLowerCase(), 'Complexity'),
  }

  enrichments.push(complexity)

  await context.update({
    enrichments
  });
}