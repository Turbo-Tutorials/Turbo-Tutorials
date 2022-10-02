export function useSetVideoWatched(videoId: string) {
  if (window && localStorage) {
    const watchedVideos = localStorage.getItem('videosWatched')
    let videos = [];

    if (watchedVideos) {
      videos = JSON.parse(watchedVideos)
    }

    videos.push(videoId)
    const uniqueList = [...new Set(videos)]

    localStorage.setItem('videosWatched', JSON.stringify(uniqueList));
  }
}