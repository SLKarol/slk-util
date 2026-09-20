import { useContext } from "react";

import { RedditStateContext } from "./RedditContext";
/**
 * Хук для обращения к стору от YaPlakal
 */
export const useRedditRootStore = () => useContext(RedditStateContext);
