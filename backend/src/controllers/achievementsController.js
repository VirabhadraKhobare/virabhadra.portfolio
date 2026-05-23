import { asyncHandler } from "../utils/asyncHandler.js";

const refreshMs =
  Number(process.env.ACHIEVEMENTS_REFRESH_MS) || 1000 * 60 * 60 * 12;
const parseProfileValue = (value, fallback, prefixes = []) => {
  const raw = (value || fallback || "").trim();
  if (!raw) {
    return fallback;
  }

  for (const prefix of prefixes) {
    if (raw.startsWith(prefix)) {
      return raw.slice(prefix.length).replace(/^\/+/, "").trim() || fallback;
    }
  }

  return raw.replace(/^\/+/, "").trim() || fallback;
};

const defaultGithubUsername = parseProfileValue(
  process.env.GITHUB_USERNAME,
  "VirbhadraKhobare",
  ["https://github.com/", "http://github.com/"],
);
const defaultLeetCodeUsername = parseProfileValue(
  process.env.LEETCODE_USERNAME,
  "virbhadra07",
  ["https://leetcode.com/", "http://leetcode.com/"],
);
const defaultCodeforcesHandle = parseProfileValue(
  process.env.CODEFORCES_HANDLE,
  "virbhadrakhobare111",
  ["https://codeforces.com/profile/", "http://codeforces.com/profile/"],
);
const defaultHackerrankHandle = parseProfileValue(
  process.env.HACKERRANK_HANDLE,
  "virbhadra06",
  [
    "https://www.hackerrank.com/profile/",
    "http://www.hackerrank.com/profile/",
    "https://hackerrank.com/profile/",
    "http://hackerrank.com/profile/",
  ],
);

const cache = {
  timestamp: 0,
  data: null,
};

const buildProfileLinks = () => ({
  github: `https://github.com/${defaultGithubUsername}`,
  leetcode: `https://leetcode.com/${defaultLeetCodeUsername}`,
  codeforces: `https://codeforces.com/profile/${defaultCodeforcesHandle}`,
  hackerrank: `https://www.hackerrank.com/profile/${defaultHackerrankHandle}`,
});

const safeJsonFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "content-type": "application/json",
      "user-agent": "VirbhadraPortfolio/1.0",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

const fetchGithubSummary = async () => {
  const headers = {};

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  const data = await safeJsonFetch(
    `https://api.github.com/users/${encodeURIComponent(defaultGithubUsername)}`,
    { headers },
  );

  return {
    repos: data.public_repos || 0,
    followers: data.followers || 0,
    following: data.following || 0,
    publicGists: data.public_gists || 0,
  };
};

const fetchLeetCodeSummary = async () => {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        profile {
          ranking
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const data = await safeJsonFetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      origin: "https://leetcode.com",
      referer: "https://leetcode.com/",
    },
    body: JSON.stringify({
      query,
      variables: {
        username: defaultLeetCodeUsername,
      },
    }),
  });

  const matchedUser = data?.data?.matchedUser;
  const solvedEntries = matchedUser?.submitStats?.acSubmissionNum || [];
  const totalSolved =
    solvedEntries.find((entry) => entry.difficulty === "All")?.count || 0;

  return {
    solved: totalSolved,
    ranking: matchedUser?.profile?.ranking || null,
  };
};

const fetchCodeforcesSummary = async () => {
  const data = await safeJsonFetch(
    `https://codeforces.com/api/user.info?handles=${encodeURIComponent(defaultCodeforcesHandle)}`,
  );

  const user = data?.result?.[0] || {};

  return {
    rating: user.rating || 0,
    maxRating: user.maxRating || 0,
    rank: user.rank || "unrated",
  };
};

const resolveAchievements = async () => {
  const [githubResult, leetcodeResult, codeforcesResult] =
    await Promise.allSettled([
      fetchGithubSummary(),
      fetchLeetCodeSummary(),
      fetchCodeforcesSummary(),
    ]);

  return {
    github:
      githubResult.status === "fulfilled"
        ? githubResult.value
        : cache.data?.github || {
            repos: 0,
            followers: 0,
            following: 0,
            publicGists: 0,
          },
    leetcode:
      leetcodeResult.status === "fulfilled"
        ? leetcodeResult.value
        : cache.data?.leetcode || {
            solved: 0,
            ranking: null,
          },
    codeforces:
      codeforcesResult.status === "fulfilled"
        ? codeforcesResult.value
        : cache.data?.codeforces || {
            rating: 0,
            maxRating: 0,
            rank: "unrated",
          },
    profileLinks: buildProfileLinks(),
    lastUpdated: new Date().toISOString(),
  };
};

export const getAchievementsSummary = asyncHandler(
  async (_request, response) => {
    const isFresh = cache.data && Date.now() - cache.timestamp < refreshMs;

    if (isFresh) {
      return response.json(cache.data);
    }

    const data = await resolveAchievements();
    cache.data = data;
    cache.timestamp = Date.now();

    return response.json(data);
  },
);
