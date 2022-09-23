export const getVideoMeta = async (id: string, withComments: boolean) => {
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.BASE_URL
  const result = await fetch(`${url}/api/video?videoId=${id}&withComments=${withComments}`)
  const res = await result.json();
  return res
}

export const tutorialYouTubeEnhancer = async ({ component, parameter }) => {
  if (component.type !== 'tutorialList') {
    return parameter.value
  }

  const enhanceYouTubeTutorials = async () => {
    const result = await Promise.all(parameter.value.map(async (tutorial) => {
      const videoMeta = await getVideoMeta(tutorial.videoId, component.parameters?.withComments?.value || false)

      return {
        ...tutorial,
        ...videoMeta
      }
    }))

    function orderByPopularity(tutorials) {
      return tutorials.sort((a, b) => (a.meta.views > b.meta.views ? -1 : 1));
    }

    const popular = component.parameters?.popular?.value || false

    return popular
      ? orderByPopularity(result)
      : result
  }

  parameter.value = await enhanceYouTubeTutorials();
  return parameter.value;
}