export function useVideoWatched(videoId: string) {
  if (window && localStorage) {
    const watchedVideos = localStorage.getItem('videosWatched')
    let videos = [];

    if (watchedVideos) {
      videos = JSON.parse(watchedVideos)
    }

    return videos.includes(videoId)
  }
}