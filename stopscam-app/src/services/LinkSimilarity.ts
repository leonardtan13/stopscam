import stringSimilarity from "string-similarity";
// import { Post } from "./store";

export const getSimilarity = (link1: string, link2: string): number => {
  return stringSimilarity.compareTwoStrings(link1, link2);
};

// export const findSimilarityInPosts = (
//   posts: Map<string, Post>,
//   link: string
// ) => {
// console.log(posts)
// Object.keys(posts).forEach((key) => console.log(key));
//   const targets: string[] = posts.map((post: Post) => {
//     return post.link;
//   });
//   console.log("link: ", link)
//   console.log("target: ", targets)
//   return stringSimilarity.findBestMatch(link, targets);
// };
