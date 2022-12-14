import * as duration from 'duration-fns'
import { H3Event } from 'h3';

const getVideoSpecs = async (id: string) => {
  const data = await $fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${id}&key=${process.env.YOUTUBE_KEY}`)
  const durationRaw = data.items[0].contentDetails.duration;
  const durationObj = duration.parse(durationRaw)
  const { viewCount, likeCount, commentCount } = data.items[0].statistics
  return {
    duration: `${durationObj.minutes}:${durationObj.seconds}`,
    views: Number(viewCount),
    likes: Number(likeCount),
    comments: Number(commentCount)
  }
}

const getVideoComments = async (id: string) => {
  const data = await $fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${id}&key=${process.env.YOUTUBE_KEY}`)
  const comments = data.items?.map((comment) => {
    return {
      topLevel: {
        author: comment.snippet.topLevelComment.snippet.authorDisplayName,
        image: comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
        text: comment.snippet.topLevelComment.snippet.textDisplay,
        date: comment.snippet.topLevelComment.snippet.updatedAt
      },
      replies: comment.replies && comment.replies.comments.map((reply) => {
        return {
          author: reply.snippet.authorDisplayName,
          image: reply.snippet.authorProfileImageUrl,
          text: reply.snippet.textDisplay,
          date: reply.snippet.updatedAt,
        }
      })
    }
  })

  return comments;
}

export default defineEventHandler(async (event: H3Event) => {
  const { videoId, withComments } = getQuery(event)
  const meta = await getVideoSpecs(videoId as string)

  const result = {
    meta,
    comments: []
  }

  if (withComments && withComments !== "false") {
    result.comments = await getVideoComments(videoId as string)
  }

  return result
})