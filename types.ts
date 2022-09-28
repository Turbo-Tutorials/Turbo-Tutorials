export type Poster = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Meta = {
  duration: string;
  views: number;
  likes: number;
  comments: number;
};

export type Comment = {
  author: string;
  image: string;
  text: string;
  date: string;
}

export type Comments = {
  topLevel: Comment,
  replies: Comment;
};

export type Tutorial = {
  slug: string;
  objectID?: string;
  _highlightresult?: {};
  title: string;
  description: string;
  poster: Poster;
  publicationDate: string;
  videoId: string;
  githubLink?: string;
  content?: string;
  meta: Meta;
  comments?: Comments;
  tags: [];
  transcript: string;
  complexity: "Easy" | "Intermediate" | "Complex";
  small?: Boolean;
};