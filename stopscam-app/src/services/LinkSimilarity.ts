import stringSimilarity from "string-similarity";
import { Post } from "./store";

export const getSimilarity = (link1: string, link2: string): number => {
  return stringSimilarity.compareTwoStrings(link1, link2);
};

export const findSimilarityInPosts = (
  posts: Map<string, Post>,
  link: string
) => {
  const targets: string[] = [];
  const identifiers: Map<string, string> = new Map();

  Array.from(posts.values()).forEach((post: Post) => {
    targets.push(post.link);
    identifiers[post.link] = post.id;
  });

  const results = stringSimilarity.findBestMatch(link, targets);

  results["ratings"] = results["ratings"].map((result) => {
    result["id"] = identifiers[result["target"]];
    return result;
  });

  results["bestMatch"]["id"] = identifiers[results["bestMatch"]["target"]];
  return results;
};
