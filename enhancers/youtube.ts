export const getVideoMeta = async (id: string, withComments: boolean) => {
  const url = process.env.BASE_URL
  const result = await fetch(`${url}/api/video?videoId=${id}&withComments=${withComments}`)
  const res = await result.json();
  return res
}
// res:
// {
//   meta: { 
//     duration: '3:13', 
//     views: 1, 
//     likes: 0, 
//     comments: 0 
//   },
//   comments: []
// }

// return new Promise(resolve => {
//   resolve({
//     meta: {
//       duration: "0:00",
//       views: 1,
//       likes: 1,
//       comments: 0
//     },
//     comments: []
//   });
// });
//}

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