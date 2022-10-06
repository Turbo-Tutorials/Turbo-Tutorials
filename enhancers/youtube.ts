export const getVideoMeta = async (id: string, withComments: boolean) => {
  const result = await $fetch(`/api/video?videoId=${id}&withComments=${withComments}`)
  return result
}

export const tutorialYouTubeEnhancer = async ({ component, parameter }) => {
  const enhanceYouTubeTutorials = async () => {
    const result = await Promise.all(parameter.value.map(async (tutorial) => {
      const videoMeta = await getVideoMeta(tutorial.videoId, component.parameters?.withComments?.value || false)
      return {
        ...tutorial,
        ...videoMeta as object
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