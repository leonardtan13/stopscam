import stringSimilarity from "string-similarity";
import { Post } from "./store";

export const getSimilarity = (link1: string, link2: string): number => {
  return stringSimilarity.compareTwoStrings(link1, link2);
};

export const findSimilarityInPosts = (
  posts: Map<string, Post>,
  link: string
) => {
  const targets: string[] = Array.from(posts.values()).map((post: Post) => {
    return post.link;
  });
  return stringSimilarity.findBestMatch(link, targets);
};
